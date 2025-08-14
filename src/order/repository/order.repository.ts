import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from '../dto/order-output';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async saveOrder2(orderId: string, status: OrderStatus) {
    await this.orderRepository.save(
      this.orderRepository.create({
        orderId,
        status,
      }),
    );
  }

  async saveOrder(
    orderId: string,
    totalPrice: string,
    note: string,
    deliveryAddress: string,
    restaurantId: string,
    clientId: string,
    driverId: string | null,
  ) {
    await this.orderRepository.save(
      this.orderRepository.create({
        orderId,
        totalPrice,
        note,
        deliveryAddress,
        restaurantId,
        clientId,
        driverId,
      }),
    );
  }

  async getOrderById(orderId: string) {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .where('order.orderId = :orderId', { orderId })
      .getOne();

    return result;
  }
}
