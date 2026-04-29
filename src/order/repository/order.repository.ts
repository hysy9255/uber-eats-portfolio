import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateOrderData } from '../types/create-order-data';
import { ReadOrderData } from '../types/read-order-data';
import { UpdateOrderData } from '../types/update-order-data';
import { OrderStatus } from 'src/constants/orderStatus';
import { ReadOrderDataSchema } from '../schema/read-order-data.schema';
import { ClientOrderDetailRow } from '../types/client-order-detail-row';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async save(data: CreateOrderData): Promise<{ orderId: string }> {
    const { orderId } = await this.orderRepository.save(
      this.orderRepository.create(data),
    );
    return { orderId };
  }

  async update(data: UpdateOrderData) {
    await this.orderRepository.save(this.orderRepository.create(data));
  }

  async findOneById(orderId: string): Promise<ReadOrderData> {
    const row = await this.baseReadQb()
      .where('order.orderId = :orderId', { orderId })
      .getRawOne<ReadOrderData>();

    if (!row) {
      throw new Error('Order Not Found');
    }

    return this.parseOne(row);
  }

  async findByClientId(clientId: string, statuses?: OrderStatus[]) {
    const rows = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.restaurant', 'restaurant')
      .leftJoin('order.deliveryAddressSnapshot', 'snapshot')
      .leftJoin('order.orderItems', 'orderItem')
      .leftJoin('orderItem.dish', 'dish')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'restaurant.dba AS "dba"',
        'restaurant.prepTime AS "eta"',
        'snapshot.streetAddress AS "streetAddress"',
        'snapshot.apt AS "apt"',
        'snapshot.city AS "city"',
        'snapshot.state AS "state"',
        'snapshot.zip AS "zip"',
        'orderItem.quantity AS "quantity"',
        'dish.name AS "name"',
        'dish.price AS "price"',
        'dish.dishImgUrl AS "dishImg"',
      ])
      .where('order.clientId = :clientId', { clientId });

    if (statuses && statuses.length > 0) {
      rows.andWhere('order.status IN (:...statuses)', { statuses });
    }

    return await rows.getRawMany<ClientOrderDetailRow>();
  }

  async findByIdAndClientId(orderId: string, clientId: string) {
    const rows = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.restaurant', 'restaurant')
      .leftJoin('order.deliveryAddressSnapshot', 'snapshot')
      .leftJoin('order.orderItems', 'orderItem')
      .leftJoin('orderItem.dish', 'dish')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'restaurant.dba AS "dba"',
        'restaurant.prepTime AS "eta"',
        'snapshot.streetAddress AS "streetAddress"',
        'snapshot.apt AS "apt"',
        'snapshot.city AS "city"',
        'snapshot.state AS "state"',
        'snapshot.zip AS "zip"',
        'orderItem.quantity AS "quantity"',
        'dish.name AS "name"',
        'dish.price AS "price"',
        'dish.dishImgUrl AS "dishImg"',
      ])
      .where('order.orderId = :orderId', { orderId })
      .andWhere('order.clientId = :clientId', { clientId });

    return await rows.getRawMany<ClientOrderDetailRow>();
  }

  async findByClient(
    clientId: string,
    statuses?: OrderStatus[],
  ): Promise<ReadOrderData[]> {
    const qb = this.baseReadQb().where('order.clientId = :clientId', {
      clientId,
    });

    if (statuses && statuses.length > 0) {
      qb.andWhere('order.status IN (:...statuses)', { statuses });
    }

    const rows = await qb.getRawMany<ReadOrderData>();
    return this.parseMany(rows);
  }

  async findByOwner(
    ownerId: string,
    status?: OrderStatus,
  ): Promise<ReadOrderData[]> {
    const qb = this.baseReadQb()
      .leftJoin('order.restaurant', 'restaurant')
      .where('restaurant.ownerId = :ownerId', { ownerId });

    if (status) {
      qb.andWhere('order.status = :status', { status });
    }
    const rows = await qb.getRawMany();
    return this.parseMany(rows);
  }

  async findInDateRange(
    restaurantId: string,
    startDate: Date,
    endDate: Date,
    status?: OrderStatus,
  ): Promise<ReadOrderData[]> {
    const qb = this.baseReadQb()
      .where('order.restaurantId = :restaurantId', { restaurantId })
      .andWhere('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    if (status) {
      qb.andWhere('order.status = :status', { status });
    }

    const rows = await qb.getRawMany();
    return this.parseMany(rows);
  }

  private baseReadQb(): SelectQueryBuilder<OrderEntity> {
    return this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'order.clientId AS "clientId"',
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
