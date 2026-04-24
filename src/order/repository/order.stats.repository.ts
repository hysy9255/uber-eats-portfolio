import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';
import { QuantityAndDishName } from 'src/dish/types/menu-ranking-data';

@Injectable()
export class OrderStatsRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findTopDishesByQuantity(
    restaurantId: string,
    limit: number,
    orderBy: 'ASC' | 'DESC',
  ): Promise<QuantityAndDishName[]> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderItems', 'oi')
      .leftJoin('oi.dish', 'dish')
      .select([
        'oi.dishId AS "dishId"',
        'SUM(oi.quantity) AS "quantity"',
        'dish.name AS "dishName"',
      ])
      .where('order.restaurantId = :restaurantId', { restaurantId })
      .groupBy('oi.dishId')
      .addGroupBy('dish.name')
      .orderBy('SUM(oi.quantity)', orderBy)
      .limit(limit)
      .getRawMany<QuantityAndDishName>();

    return result.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));
  }
}
