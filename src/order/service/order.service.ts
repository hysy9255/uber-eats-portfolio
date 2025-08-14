import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderInput } from '../dto/order-input';
import { OrderItem } from '../dto/order-output';
import { v4 as uuidv4 } from 'uuid';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { UserOutput, UserRole } from 'src/user/dto/user-output';
import { OrderDomainService } from './order.domain.service';
import { Order } from '../domain/order';
import { OrderEntity } from '../orm-entities/order.orm.entity';
// import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly orderDomainService: OrderDomainService,
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

    const orderId = uuidv4();
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
        orderItemId: uuidv4(),
        dishId: item.dishId,
        quantity: item.quantity,
        orderId,
      };
    });

    await this.orderItemRepository.saveOrderItems(orderItems);
  }

  async getOrder(orderId: string, requester: UserOutput) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    switch (requester.role) {
      case UserRole.Client: {
        const clientId = await this.orderDomainService.validateClientExists(
          requester.userId,
        );
        if (order.clientId !== clientId)
          throw new Error('You are not the client of this order');
        break;
      }
      case UserRole.Owner: {
        const restaurantId =
          await this.orderDomainService.validateOwnersRestaurantExists(
            requester.userId,
          );

        if (order.restaurantId !== restaurantId)
          throw new Error('You are not the owner of this restaurant');
        break;
      }
      case UserRole.Driver: {
        await this.orderDomainService.validateDriverExists(requester.userId);
        break;
      }
    }

    return order;
  }

  async acceptOrder(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const orderModel = Order.fromPersistance(order.orderId, order.status);

    orderModel.markAccepted();

    const record = new OrderEntity();
    record.orderId = orderModel.orderId;
    record.status = orderModel.status;

    await this.orderRepository.saveOrder2(
      orderModel.orderId,
      orderModel.status,
    );
  }

  async markOrderRead() {}

  async driverAcceptOrder() {}

  async driverDeclineOrder() {}

  async driverPickupOrder() {}

  async driverCompleteDelivery() {}
}
