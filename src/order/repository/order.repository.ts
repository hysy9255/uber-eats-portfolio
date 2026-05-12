import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entity/order.orm.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateOrderData } from '../types/create-order-data';
import { ReadOrderData } from '../types/read-order-data';
import { UpdateOrderData } from '../types/update-order-data';
import { OrderStatus } from 'src/constants/orderStatus';
import { ReadOrderDataSchema } from '../schema/read-order-data.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async save(data: CreateOrderData): Promise<{ orderId: string }> {
    try {
      const { orderId } = await this.repo.save(this.repo.create(data));
      return { orderId };
    } catch (e) {
      console.error('Error saving order:', e);
      throw new InternalServerErrorException('Failed to save order');
    }
  }

  async update(data: UpdateOrderData) {
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error updating order:', e);
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async findOneByIdAndOwnerId(
    orderId: string,
    ownerId: string,
  ): Promise<ReadOrderData | undefined> {
    try {
      return await this.baseReadQb()
        .leftJoin('order.restaurant', 'restaurant')
        .leftJoin('restaurant.owner', 'owner')
        .where('order.orderId = :orderId', { orderId })
        .andWhere('owner.ownerId = :ownerId', { ownerId })
        .getRawOne<ReadOrderData>();
    } catch (e) {
      console.error('Error finding order:', e);
      throw new InternalServerErrorException('Failed to find order');
    }
  }

  async findInDateRange(
    restaurantId: string,
    startDate: Date,
    endDate: Date,
    status?: OrderStatus,
  ): Promise<ReadOrderData[]> {
    try {
      const qb = this.baseReadQb()
        .where('order.restaurantId = :restaurantId', { restaurantId })
        .andWhere('order.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        });

      if (status) {
        qb.andWhere('order.status = :status', { status });
      }

      return await qb.getRawMany();
    } catch (e) {
      console.error('Error finding orders:', e);
      throw new InternalServerErrorException('Failed to find orders');
    }
  }

  private baseReadQb(): SelectQueryBuilder<OrderEntity> {
    return this.repo
      .createQueryBuilder('order')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.clientId AS "clientId"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'order.restaurantId AS "restaurantId"',
      ]);
  }

  private parseOne(row: unknown): ReadOrderData {
    const parsed = ReadOrderDataSchema.safeParse(row);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException('Invalid order read model');
    }

    return parsed.data;
  }

  private parseMany(rows: unknown[]): ReadOrderData[] {
    const parsed = ReadOrderDataSchema.array().safeParse(rows);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException('Invalid order read model');
    }

    return parsed.data;
  }
}
