import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entity/order.orm.entity';
import { Repository } from 'typeorm';
import { OwnerOrderDetailRow } from '../types/owner-order-detail-row';
import { OrderStatus } from 'src/constants/orderStatus';

@Injectable()
export class OwnerOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async findByOwnerId(ownerId: string, status?: OrderStatus) {
    try {
      const rows = this.repo
        .createQueryBuilder('order')
        .leftJoin('order.orderItems', 'orderItem')
        .leftJoin('orderItem.dish', 'dish')
        .leftJoin('order.deliveryAddressSnapshot', 'snapshot')
        .leftJoin('order.client', 'client')
        .leftJoin('order.restaurant', 'restaurant')
        .select([
          'order.orderId AS "orderId"',
          'order.createdAt AS "createdAt"',
          'order.totalPrice AS "totalPrice"',
          'order.status AS "status"',
          'order.requestToRestaurant AS "requestToRestaurant"',
          'orderItem.quantity AS "qauntity"',
          'orderItem.price AS "price"',
          'dish.name AS "name"',
          'dish.dishImgUrl AS "dishImg"',
          'snapshot.streetAddress AS "streetAddress"',
          'snapshot.apt AS "apt"',
          'snapshot.city AS "city"',
          'snapshot.state AS "state"',
          'snapshot.zip AS "zip"',
          'client.name AS "clientName"',
          'client.clientId AS "clientId"',
          'client.phoneNumber AS "phoneNumber"',
        ])
        .where('restaurant.ownerId = :ownerId', { ownerId });

      if (status) {
        rows.andWhere('order.status = :status', { status });
      }

      return await rows.getRawMany<OwnerOrderDetailRow>();
    } catch (e) {
      console.error('Error finding orders:', e);
      throw new InternalServerErrorException('Failed to find orders');
    }
  }
}
