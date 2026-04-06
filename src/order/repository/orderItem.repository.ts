import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from '../orm-entities/order-item.orm.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemData } from '../types/create-order-item-data';
import { ReadOrderItemData } from '../types/read-order-item-data';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly repo: Repository<OrderItemEntity>,
  ) {}

  async save(data: CreateOrderItemData[]) {
    await this.repo.save(this.repo.create(data));
  }

  async findByOrderId(orderId: string): Promise<ReadOrderItemData[]> {
    return await this.repo
      .createQueryBuilder('oi')
      .leftJoin('oi.dish', 'dish')
      .select([
        'oi.orderId AS "orderId"',
        'oi.quantity AS "quantity"',
        'dish.name AS "name"',
        'dish.price AS "price"',
        'dish.dishImgUrl AS "dishImg"',
      ])
      .where('oi.orderId = :orderId', { orderId })
      .getRawMany<ReadOrderItemData>();
  }

  async findByOrderIds(orderIds: string[]): Promise<ReadOrderItemData[]> {
    return await this.repo
      .createQueryBuilder('oi')
      .leftJoin('oi.dish', 'dish')
      .select([
        'oi.orderId AS "orderId"',
        'oi.quantity AS quantity',
        'oi.dishId AS "dishId"',
        'dish.name AS name',
        'dish.price AS price',
        'dish.dishImgUrl AS "dishImg"',
      ])
      .where('oi.orderId IN (:...orderIds)', { orderIds })
      .getRawMany<ReadOrderItemData>();
  }
}
