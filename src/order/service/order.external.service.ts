import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderDomainService } from './order.domain.service';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { OrderRepository } from '../repository/order.repository';
import { OrderMapper } from '../mapper/order.mapper';
import { RestaurantInternalService } from 'src/restaurant/service/restaurant.internal.service';
import { DishInternalService } from 'src/dish/dish.internal.service';
import { OrderItemMapper } from '../mapper/order-item.mapper';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { DeliveryAddressSnapshotMapper } from '../mapper/delivery-address-snapshot.mapper';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { RestaurantInfoDTO } from 'src/restaurant/dto/restaurant-Info.dto';
import { OrderStatus } from 'src/constants/orderStatus';
import { ReadOrderData } from '../types/read-order-data';
import { OrderGateway } from '../order.gateway';
import { buildDailyRevenue } from 'src/utils/buildDailyRevenue';
import { MenuRankingDTO } from 'src/dish/types/menu-ranking-data';
import { GetOwnerDashBoardPageDTO } from '../dto/get-owner-dashboard-page.dto';
import { OrderStatsRepository } from '../repository/order.stats.repository';

@Injectable()
export class OrderExternalService {
  constructor(
    private readonly clientInternalService: ClientInternalService,
    private readonly ownerInternalService: OwnerInternalService,
    private readonly restaurantInternalService: RestaurantInternalService,
    private readonly dishInternalService: DishInternalService,
    private readonly orderDomainService: OrderDomainService,
    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly deliveryAddressSnapshotRepo: DeliveryAddressSnapshotRepository,
    private readonly orderMapper: OrderMapper,
    private readonly orderItemMapper: OrderItemMapper,
    private readonly deliveryAddressSnapshotMapper: DeliveryAddressSnapshotMapper,
    private readonly orderGateway: OrderGateway,
    private readonly orderStatsRepository: OrderStatsRepository,
  ) {}

  async createOrder(
    userId: string,
    dto: CreateOrderDTO,
  ): Promise<{ orderId: string }> {
    const restaurant = await this.restaurantInternalService.getById(
      dto.restaurantId,
    );

    if (!restaurant) throw new Error('Restaurant Not Found');

    const dishIds = dto.orderItems.map((item) => item.dishId);
    const dishes = await this.dishInternalService.getManyByIds(dishIds);

    const totalPrice = this.orderDomainService.calculateTotalPrice(
      dto.orderItems,
      dishes,
    );

    const { clientId } =
      await this.clientInternalService.getClientByUserId(userId);

    const createOrderData = this.orderMapper.dtoToCreateData(
      clientId,
      totalPrice,
      dto,
    );
    await this.orderRepo.saveOrder(createOrderData);

    const createOrderItemsData = this.orderItemMapper.dtoToCreateData(
      createOrderData.orderId,
      dto.orderItems,
    );
    await this.orderItemRepo.save(createOrderItemsData);

    const readDeliveryAddressData =
      await this.clientInternalService.getDeliveryAddressById(
        dto.deliveryAddressId,
      );
    const createDeliveryAddressSnapshotData =
      this.deliveryAddressSnapshotMapper.toCreateData(
        createOrderData.orderId,
        readDeliveryAddressData,
      );
    await this.deliveryAddressSnapshotRepo.save(
      createDeliveryAddressSnapshotData,
    );

    this.orderGateway.emitOrderCreated(dto.restaurantId, {
      restaurantId: restaurant.restaurantId,
    });

    return { orderId: createOrderData.orderId };
  }

  async getOrdersForOwner(
    userId: string,
    status?: OrderStatus,
  ): Promise<GetOrderForOwnerDTO[]> {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const orders = await this.orderRepo.findByOwner(ownerId, status);
    if (orders.length === 0) return [];

    const orderIds = orders.map((order) => order.orderId);

    const orderItems = await this.orderItemRepo.findByOrderIds(orderIds);

    const daSnapshots =
      await this.deliveryAddressSnapshotRepo.findByOrderIds(orderIds);

    const clientIds = orders.map((order) => order.clientId);

    const clientInfos =
      await this.clientInternalService.getClientInfoByIds(clientIds);

    return orders.map((order) => {
      const response = new GetOrderForOwnerDTO();
      response.orderInfo = this.orderMapper.readDataToDto(order);
      const ois = orderItems.filter((item) => item.orderId === order.orderId);
      response.orderItems = this.orderItemMapper.readDataToDto(ois);
      const dass = daSnapshots.find(
        (snapshot) => snapshot.orderId === order.orderId,
      );
      if (!dass) throw new Error('Delivery Address Snapshot Not Found');
      response.deliveryAddressInfo =
        this.deliveryAddressSnapshotMapper.readDataToDTO(dass);

      const clientInfo = clientInfos.find((c) => c.clientId === order.clientId);
      if (!clientInfo) throw new Error('ClientInfo Not Found');
      response.clientInfo = clientInfo;
      return response;
    });
  }

  async getOrderForClient(
    userId: string,
    orderId: string,
  ): Promise<GetOrderForClientDTO> {
    const { clientId } =
      await this.clientInternalService.getClientByUserId(userId);

    const order = await this.orderRepo.findById(orderId);
    if (order?.clientId !== clientId) throw new Error('Unauthorized');
    const orderItems = await this.orderItemRepo.findByOrderId(orderId);
    const { dba, prepTime: eta } =
      await this.restaurantInternalService.getByOrderId(orderId);

    const response = new GetOrderForClientDTO();
    response.orderInfo = this.orderMapper.readDataToDto(order);
    response.orderItems = this.orderItemMapper.readDataToDto(orderItems);
    const restaurantInfo = new RestaurantInfoDTO({ dba, eta });
    response.restaurantInfo = restaurantInfo;

    return response;
  }

  async updateOrderStatus(
    orderId: string,
    userId: string,
    status: OrderStatus,
  ) {
    // const { ownerId } =
    //   await this.ownerInternalService.getOwnerIdByUserId(userId);

    // const restaurant =
    //   await this.restaurantInternalService.getByOwnerId(ownerId);

    const order = await this.orderRepo.findById(orderId);
    order.status = status;
    const updateData = this.orderMapper.readToUpdateData(order);
    await this.orderRepo.updateOrder(updateData);
    this.orderGateway.emitOrderStatusChanged(order.orderId, {
      orderId: order.orderId,
      status: order.status,
    });
  }

  async getOnGoingOrdersForClient(
    userId: string,
  ): Promise<GetOrderForClientDTO[]> {
    const { clientId } =
      await this.clientInternalService.getClientByUserId(userId);

    const orders = await this.orderRepo.findByClient(clientId, [
      OrderStatus.Pending,
      OrderStatus.Cooking,
      OrderStatus.Ready,
      OrderStatus.Delivering,
    ]);
    return this.composeOrderDTOs(orders);
  }

  async getOrderHistoryForClient(
    userId: string,
  ): Promise<GetOrderForClientDTO[]> {
    const { clientId } =
      await this.clientInternalService.getClientByUserId(userId);
    const orders = await this.orderRepo.findByClient(clientId, [
      OrderStatus.Delivered,
    ]);
    return this.composeOrderDTOs(orders);
  }

  async composeOrderDTOs(
    orders: ReadOrderData[],
  ): Promise<GetOrderForClientDTO[]> {
    if (orders.length === 0) return [];
    const orderIds = orders.map((order) => order.orderId);
    const orderItems = await this.orderItemRepo.findByOrderIds(orderIds);
    const daSnapshots =
      await this.deliveryAddressSnapshotRepo.findByOrderIds(orderIds);

    const restaurantInfos =
      await this.restaurantInternalService.getByOrderIds(orderIds);

    return orders.map((order) => {
      const response = new GetOrderForClientDTO();
      response.orderInfo = this.orderMapper.readDataToDto(order);
      const ois = orderItems.filter((item) => item.orderId === order.orderId);
      response.orderItems = this.orderItemMapper.readDataToDto(ois);
      const dass = daSnapshots.find(
        (snapshot) => snapshot.orderId === order.orderId,
      );
      if (!dass) throw new Error('Delivery Address Snapshot Not Found');
      response.deliveryAddressInfo =
        this.deliveryAddressSnapshotMapper.readDataToDTO(dass);

      const restaurantInfo = restaurantInfos.find(
        (restaurantInfo) => restaurantInfo.orderId === order.orderId,
      );
      if (!restaurantInfo) throw new Error('Restaurant Info Not Found');
      const { dba, prepTime: eta } = restaurantInfo;
      response.restaurantInfo = new RestaurantInfoDTO({ dba, eta });
      return response;
    });
  }

  async revenuePercentChange(restaurantId: string, range: string) {
    const days = Number(range) - 1;

    const firstHalfEndDate = new Date();
    firstHalfEndDate.setHours(23, 59, 59, 999);
    const firstHalfStartDate = new Date();
    firstHalfStartDate.setDate(firstHalfStartDate.getDate() - days);
    firstHalfStartDate.setHours(0, 0, 0, 0);

    const secondHalfEndDate = new Date(firstHalfStartDate);
    secondHalfEndDate.setDate(secondHalfEndDate.getDate() - 1);
    secondHalfEndDate.setHours(23, 59, 59, 999);
    const secondHalfStartDate = new Date(secondHalfEndDate);
    secondHalfStartDate.setDate(secondHalfStartDate.getDate() - days);
    secondHalfStartDate.setHours(0, 0, 0, 0);

    const firstHalfOrders = await this.orderRepo.findInDateRange(
      restaurantId,
      firstHalfStartDate,
      firstHalfEndDate,
      OrderStatus.Delivered,
    );

    const secondHalfOrders = await this.orderRepo.findInDateRange(
      restaurantId,
      secondHalfStartDate,
      secondHalfEndDate,
      OrderStatus.Delivered,
    );

    const firstHalfRevenue = firstHalfOrders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );

    const secondHalfRevenue = secondHalfOrders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );

    const percentage =
      ((firstHalfRevenue - secondHalfRevenue) / secondHalfRevenue) * 100;

    return percentage;
  }

  async getOwnerDashBoardPage(
    userId: string,
    range: string,
  ): Promise<GetOwnerDashBoardPageDTO> {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const { restaurantId } =
      await this.restaurantInternalService.getByOwnerId(ownerId);

    const days = Number(range) - 1;

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const orders = await this.orderRepo.findInDateRange(
      restaurantId,
      startDate,
      endDate,
      OrderStatus.Delivered,
    );

    const dailyRevenue = buildDailyRevenue(orders, startDate, endDate);

    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0,
    );
    const avgOrder = orders.length === 0 ? 0 : revenue / orders.length;

    const percentChange = await this.revenuePercentChange(restaurantId, range);

    return {
      orderKpi: {
        numOfOrders: orders.length,
        revenue,
        avgOrder,
        numOfReviews: 3,
      },
      revenueStats: {
        percentChange,
        revenueGraphData: dailyRevenue,
      },
    };
  }

  async getMenuRankings(
    userId: string,
    limit: string,
  ): Promise<MenuRankingDTO> {
    const { ownerId } =
      await this.ownerInternalService.getOwnerIdByUserId(userId);
    const { restaurantId } =
      await this.restaurantInternalService.getByOwnerId(ownerId);

    const topOrders = await this.orderStatsRepository.findTopDishesByQuantity(
      restaurantId,
      Number(limit),
      'DESC',
    );
    const leastOrders = await this.orderStatsRepository.findTopDishesByQuantity(
      restaurantId,
      Number(limit),
      'ASC',
    );

    return { topOrders, leastOrders };
  }
}
