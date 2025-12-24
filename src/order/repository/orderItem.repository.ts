import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from '../orm-entities/order-item.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async saveOrderItems(
    orderItems: {
      orderItemId: string;
      dishId: string;
      quantity: number;
      orderId: string;
    }[],
  ) {
    const entities = this.orderItemRepository.create(orderItems);
    await this.orderItemRepository.save(entities);
  }

  async getOrderItemsByOrderId(orderId: string) {
    const result = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .leftJoin('orderItem.dish', 'dish')
      .select([
        'orderItem.quantity AS "quantity"',
        'dish.name AS "name"',
        'dish.price AS price',
        'dish.dishImgUrl AS "dishImg"',
      ])
      .where('orderItem.orderId = :orderId', { orderId })
      .getRawMany<{
        dishImg: string;
        name: string;
        quantity: number;
        price: number;
      }>();

    return result;
  }
}
