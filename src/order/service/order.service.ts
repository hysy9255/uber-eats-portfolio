import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderInput } from '../dto/order-input';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { OrderItem } from '../dto/order-output';
import { DishRepository } from 'src/restaurant/repository/dish.repository';
import { v4 as uuidv4 } from 'uuid';
import { OrderItemRepository } from '../repository/orderItem.repository';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly dishRepository: DishRepository,
    // private readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  async createOrder(
    clientId: string,
    { restaurantId, items, note, deliveryAddress }: CreateOrderInput,
  ) {
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const totalPrice = await this.calculateTotalPrice(items);

    const orderId = uuidv4();
    await this.orderRepository.saveOrder(
      orderId,
      totalPrice,
      note,
      deliveryAddress,
      restaurantId,
      clientId,
    );

    await this.createOrderItems(orderId, items);
  }

  async calculateTotalPrice(orderItems: OrderItem[]) {
    const dishIds = orderItems.map((item) => item.dishId);
    const dishes = await this.dishRepository.getDishesByIds(dishIds);
    const totalPrice = orderItems.reduce((total, item) => {
      const dish = dishes.find((d) => d.dishId === item.dishId);
      if (dish) {
        return total + dish.price * item.quantity;
      }
      return total;
    }, 0);
    return totalPrice.toFixed(2);
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

  async getOrder(orderId: string, requesterId: string) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    console.log(requesterId);

    // const user = await this.userRepository.getUserById(requesterId);
    // if (!user) {
    //   throw new Error('User not found');
    // }

    // if (user.role === UserRole.Client) {
    //   if (order.clientId !== requesterId) {
    //     throw new Error('You are not authorized to view this order');
    //   }
    // }

    return order;
  }

  async acceptOrder(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
  }

  async markOrderRead() {}

  async driverAcceptOrder() {}

  async driverDeclineOrder() {}

  async driverPickupOrder() {}

  async driverCompleteDelivery() {}
}
