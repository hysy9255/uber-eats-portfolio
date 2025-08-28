import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async updateOrder(orderId: string, fields: Partial<OrderEntity>) {
    await this.orderRepository.update({ orderId }, fields);
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
