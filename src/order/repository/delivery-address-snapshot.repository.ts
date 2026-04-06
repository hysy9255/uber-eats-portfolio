import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryAddressSnapshotEntity } from '../orm-entities/delivery-address-snapshot.orm.entity';
import { ReadDeliveryAddressSnapshotData } from '../types/read-delivery-address-snapshot-data';
import { CreateDeliveryAddressSnapshotData } from '../types/create-delivery-address-snapshot-data';

@Injectable()
export class DeliveryAddressSnapshotRepository {
  constructor(
    @InjectRepository(DeliveryAddressSnapshotEntity)
    private readonly deliveryAddressSnapshotRepo: Repository<DeliveryAddressSnapshotEntity>,
  ) {}

  async save(data: CreateDeliveryAddressSnapshotData) {
    await this.deliveryAddressSnapshotRepo.save(
      this.deliveryAddressSnapshotRepo.create(data),
    );
  }

  async findAllByOrderIds(
    orderIds: string[],
  ): Promise<ReadDeliveryAddressSnapshotData[]> {
    return await this.deliveryAddressSnapshotRepo
      .createQueryBuilder('snap')
      .select([
        'snap.deliveryAddressSnapshotId AS "deliveryAddressSnapshotId"',
        'snap.streetAddress AS "streetAddress"',
        'snap.apt AS apt',
        'snap.city AS city',
        'snap.state AS state',
        'snap.zip AS zip',
        'snap.orderId AS "orderId"',
      ])
      .where('snap.orderId IN (:...orderIds)', {
        orderIds,
      })
      .getRawMany<ReadDeliveryAddressSnapshotData>();
  }

  //   async getOrderById(orderId: string) {
  //     const result = await this.orderRepository
  //       .createQueryBuilder('order')
  //       .leftJoinAndSelect('order.orderItems', 'orderItem')
  //       .where('order.orderId = :orderId', { orderId })
  //       .getOne();

  //     return result;
  //   }

  //   async getOrderDetailViewById(orderId: string) {
  //     const result = await this.orderRepository
  //       .createQueryBuilder('order')
  //       .leftJoin('order.client', 'client')
  //       .leftJoin('client.user', 'clientUser')
  //       .leftJoin('order.orderItems', 'orderItems')
  //       .select([
  //         'order.orderId AS "orderId"',
  //         'order.totalPrice AS "totalPrice"',
  //         'order.status AS status',
  //         'order.requestToRestaurant AS "requestToRestaurant"',
  //         'clientUser.name AS "clientName"',
  //       ])
  //       .where('order.orderId = :orderId', { orderId })
  //       .getRawOne<{
  //         orderId: string;
  //         totalPrice: number;
  //         status: OrderStatus;
  //         requestToRestaurant: string;
  //         clientName: string;
  //       }>();

  //     return result;
  //   }

  //   async getOrdersByRestaurantId(
  //     restaurantId: string,
  //   ): Promise<ReadOrderData[]> {
  //     const result = await this.orderRepository
  //       .createQueryBuilder('order')
  //       .leftJoin('order.client', 'client')
  //       .select([
  //         'order.orderId AS "orderId"',
  //         'order.createdAt AS "createdAt"',
  //         'order.totalPrice AS "totalPrice"',
  //         'order.status AS "status"',
  //         'order.requestToRestaurant AS "requestToRestaurant"',
  //       ])
  //       .where('order.restaurantId = :restaurantId', { restaurantId })
  //       .getRawMany<ReadOrderData>();

  //     return result;
  //   }
}
