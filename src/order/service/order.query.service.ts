import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/constants/orderStatus';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { RestaurantInternalService } from 'src/restaurant/service/restaurant.internal.service';
import { OrderRepository } from '../repository/order.repository';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { DeliveryAddressSnapshotRepository } from '../repository/delivery-address-snapshot.repository';
import { GetOrderForOwnerDTO } from '../dto/get-order-for-owner.dto';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { OrderOwnerDTOAssembler } from '../assembler/order-owner-dto.assembler';
import { GetOrderForClientDTO } from '../dto/get-order-for-client.dto';
import { OrderClientDTOAssembler } from '../assembler/order-client-dto.assembler';
import { OrderValidationService } from './order.validation.service';

@Injectable()
export class OrderQueryService {
  constructor(
    private readonly ownerService: OwnerInternalService,
    private readonly restaurantService: RestaurantInternalService,
    private readonly clientService: ClientInternalService,

    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly snapshotRepo: DeliveryAddressSnapshotRepository,

    private readonly ownerAssembler: OrderOwnerDTOAssembler,
    private readonly clientAssembler: OrderClientDTOAssembler,

    private readonly validation: OrderValidationService,
  ) {}

  async ownerOrders(
    userId: string,
    status?: OrderStatus,
  ): Promise<GetOrderForOwnerDTO[]> {
    const { ownerId } = await this.ownerService.getIdByUser(userId);
    const orders = await this.orderRepo.findByOwner(ownerId, status);

    if (orders.length === 0) return [];

    const orderIds = orders.map((order) => order.orderId);
    const clientIds = orders.map((order) => order.clientId);

    const orderItems = await this.orderItemRepo.findByOrders(orderIds);
    const snapshots = await this.snapshotRepo.findByOrders(orderIds);
    const clientInfos = await this.clientService.getByIds(clientIds);

    return this.ownerAssembler.build(
      orders,
      orderItems,
      snapshots,
      clientInfos,
    );
  }

  async clientOrders(
    userId: string,
    statuses?: OrderStatus[],
  ): Promise<GetOrderForClientDTO[]> {
    const { clientId } = await this.clientService.getClientByUserId(userId);

    const orders = await this.orderRepo.findByClient(clientId, statuses);

    if (orders.length === 0) return [];

    const orderIds = orders.map((order) => order.orderId);

    const orderItems = await this.orderItemRepo.findByOrders(orderIds);
    const snapshots = await this.snapshotRepo.findByOrders(orderIds);
    const restaurants = await this.restaurantService.getByOrders(orderIds);

    return this.clientAssembler.buildMany(
      orders,
      orderItems,
      snapshots,
      restaurants,
    );
  }

  async clientOrder(
    userId: string,
    orderId: string,
  ): Promise<GetOrderForClientDTO> {
    const order = await this.orderRepo.findById(orderId);
    const orderItems = await this.orderItemRepo.findByOrderId(orderId);
    const restaurant = await this.restaurantService.getByOrderId(orderId);

    await this.validation.getOrder(userId, order);
    return this.clientAssembler.build(order, orderItems, restaurant);
  }
}
