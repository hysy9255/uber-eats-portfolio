import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entity/order.orm.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { OrderStatus } from 'src/constants/orderStatus';
import { ClientOrderDetailRow } from '../types/client-order-detail-row';

@Injectable()
export class ClientOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async findByClientId(
    clientId: string,
    statuses?: OrderStatus[],
  ): Promise<ClientOrderDetailRow[]> {
    try {
      const rows = this.baseReadQb().where('order.clientId = :clientId', {
        clientId,
      });

      if (statuses && statuses.length > 0) {
        rows.andWhere('order.status IN (:...statuses)', { statuses });
      }

      return await rows.getRawMany<ClientOrderDetailRow>();
    } catch (e) {
      console.error('Error finding order:', e);
      throw new InternalServerErrorException('Failed to find order');
    }
  }

  async findByIdAndClientId(
    orderId: string,
    clientId: string,
  ): Promise<ClientOrderDetailRow[]> {
    try {
      return await this.baseReadQb()
        .where('order.orderId = :orderId', { orderId })
        .andWhere('order.clientId = :clientId', { clientId })
        .getRawMany<ClientOrderDetailRow>();
    } catch (e) {
      console.error('Error finding order:', e);
      throw new InternalServerErrorException('Failed to find order');
    }
  }

  private baseReadQb(): SelectQueryBuilder<OrderEntity> {
    return this.repo
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
      ]);
  }
}
