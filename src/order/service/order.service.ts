import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderInput } from '../dto/order-input';
import { OrderItem } from '../dto/order-output';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { UserOutput } from 'src/user/dto/user-output';
import { OrderDomainService } from './order.domain.service';
import { UserDomainService } from 'src/user/service/user.domain.service';
import { OrderAccessPolicy } from './order.access.policy';
import { SharedService } from 'src/shared/shared.service';
import { RejectedDeliveryOrderRepository } from '../repository/rejectedDeliveryOrder.repository';
import { OrderMapper } from '../order.mapper';
// import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly orderDomainService: OrderDomainService,
    private readonly userDomainService: UserDomainService,
    private readonly orderDomainSerivce: OrderDomainService,
    private readonly orderAccessPolicy: OrderAccessPolicy,
    private readonly sharedService: SharedService,
    private readonly rejectedDeliveryOrderRepository: RejectedDeliveryOrderRepository,
  ) {}

  // @Transactional()
  async createOrder(
    userId: string,
    restaurantId: string,
    { items, note, deliveryAddress }: CreateOrderInput,
  ) {
    await this.orderDomainService.validateRestaurantExists(restaurantId);
    const clientId = await this.orderDomainService.validateClientExists(userId);

    const totalPrice = await this.orderDomainService.calculateTotalPrice(items);
    const driverId = null;

    const orderId = this.sharedService.generateId();
    await this.orderRepository.saveOrder(
      orderId,
      totalPrice,
      note,
      deliveryAddress,
      restaurantId,
      clientId,
      driverId,
    );

    await this.createOrderItems(orderId, items);
  }

  async createOrderItems(orderId: string, items: OrderItem[]) {
    const orderItems = items.map((item) => {
      return {
        orderItemId: this.sharedService.generateId(),
        dishId: item.dishId,
        quantity: item.quantity,
        orderId,
      };
    });

    await this.orderItemRepository.saveOrderItems(orderItems);
  }

  async getOrders() {}

  async getOrder(orderId: string, requester: UserOutput) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    await this.orderAccessPolicy.ensureCanView(orderId, requester);
    return order;
  }

  async acceptOrder(orderId: string, userId: string) {
    const owner = await this.userDomainService.getOwnerDomainByUserId(userId);
    const order = await this.orderDomainService.getOrderDomainById(orderId);
    owner.accept(order);

    await this.orderRepository.updateOrder(
      order.orderId,
      OrderMapper.toOrmEntity(order),
    );
    // await this.orderEventPublisher.broadcastOrderStatusUpdate(order.id);
  }

  async markOrderReady(orderId: string, userId: string) {
    const owner = await this.userDomainService.getOwnerDomainByUserId(userId);
    const order = await this.orderDomainService.getOrderDomainById(orderId);
    owner.donePreparing(order);

    await this.orderRepository.updateOrder(
      order.orderId,
      OrderMapper.toOrmEntity(order),
    );
    // await this.orderEventPublisher.broadcastOrderStatusUpdate(order.id);
  }

  async driverAcceptOrder(orderId: string, userId: string) {
    const driver = await this.userDomainService.getDriverDomainByUserId(userId);
    const order = await this.orderDomainService.getOrderDomainById(orderId);
    driver.accept(order);

    await this.orderRepository.updateOrder(
      order.orderId,
      OrderMapper.toOrmEntity(order),
    );
  }

  async driverDeclineOrder(orderId: string, userId: string) {
    const driver = await this.userDomainService.getDriverDomainByUserId(userId);
    const order = await this.orderDomainService.getOrderDomainById(orderId);
    driver.decline(order);

    await this.rejectedDeliveryOrderRepository.save({
      orderId: order.orderId,
      driverId: driver.driverId,
    });
  }

  async driverPickupOrder(orderId: string, userId: string) {
    const driver = await this.userDomainService.getDriverDomainByUserId(userId);
    const order = await this.orderDomainService.getOrderDomainById(orderId);
    driver.pickup(order);

    await this.orderRepository.updateOrder(
      order.orderId,
      OrderMapper.toOrmEntity(order),
    );
  }

  async driverCompleteDelivery(orderId: string, userId: string) {
    const driver = await this.userDomainService.getDriverDomainByUserId(userId);
    const order = await this.orderDomainService.getOrderDomainById(orderId);
    driver.complete(order);

    await this.orderRepository.updateOrder(
      order.orderId,
      OrderMapper.toOrmEntity(order),
    );
  }
}
