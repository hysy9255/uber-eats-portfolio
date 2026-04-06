import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';
import { CreateOrderData } from '../types/create-order-data';
import { ReadOrderData } from '../types/read-order-data';
import { UpdateOrderData } from '../types/update-order-data';
import { OrderStatus } from 'src/constants/orderStatus';
import { QuantityAndDishName } from 'src/dish/types/menu-ranking-data';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async updateOrder(data: UpdateOrderData) {
    await this.orderRepository.save(this.orderRepository.create(data));
  }

  async saveOrder(data: CreateOrderData) {
    await this.orderRepository.save(this.orderRepository.create(data));
  }

  async findOrderById(orderId: string): Promise<ReadOrderData> {
    const row = await this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'order.clientId AS "clientId"',
      ])
      .where('order.orderId = :orderId', { orderId })
      .getRawOne<ReadOrderData>();

    if (!row) throw new Error('Order Not Found');
    return row;
  }

  async findOrdersByRestaurantId(
    restaurantId: string,
    status?: OrderStatus,
  ): Promise<ReadOrderData[]> {
    const result = this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'order.clientId AS "clientId"',
      ])
      .where('order.restaurantId = :restaurantId', { restaurantId });

    if (status) {
      result.andWhere('order.status = :status', { status });
    }

    return result.getRawMany<ReadOrderData>();
  }

  async findDeliveredInDateRange(
    restaurantId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ReadOrderData[]> {
    const result = this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'order.clientId AS "clientId"',
      ])
      .where('order.restaurantId = :restaurantId', { restaurantId })
      .andWhere('order.status = :status', { status: OrderStatus.Delivered })
      .andWhere('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    return result.getRawMany<ReadOrderData>();
  }

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

  async findOrdersByClientIdAndStatuses(
    clientId: string,
    statuses: OrderStatus[],
  ): Promise<ReadOrderData[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'order.clientId AS "clientId"',
      ])
      .where('order.clientId = :clientId', { clientId })
      .andWhere('order.status IN (:...statuses)', { statuses })
      .getRawMany<ReadOrderData>();
  }
}
