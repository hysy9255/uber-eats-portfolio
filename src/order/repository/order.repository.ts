import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';
import { DeliveryType } from '../dto/order-input';
import { OrderStatus } from '../dto/order-output';

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
    restaurantId: string,
    totalPrice: string,
    clientId: string,
    driverId: string | null,
    deliveryType: DeliveryType,
    requestToRestaurant: string | null,
    requestToDriver: string | null,
    deliveryAddress?: string,
  ) {
    await this.orderRepository.save(
      this.orderRepository.create({
        orderId,
        totalPrice,
        deliveryAddress,
        restaurantId,
        clientId,
        driverId,
        deliveryType,
        requestToRestaurant,
        requestToDriver,
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

  async getOrderDetailViewById(orderId: string) {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.client', 'client')
      .leftJoin('client.user', 'clientUser')
      .leftJoin('order.orderItems', 'orderItems')
      .select([
        'order.orderId AS "orderId"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS status',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'clientUser.name AS "clientName"',
      ])
      .where('order.orderId = :orderId', { orderId })
      .getRawOne<{
        orderId: string;
        totalPrice: number;
        status: OrderStatus;
        requestToRestaurant: string;
        clientName: string;
      }>();

    return result;
  }

  async getOrdersViewByRestaurantId(restaurantId: string) {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      // .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoin('order.client', 'client')
      .leftJoin('client.user', 'clientUser')
      .leftJoin('order.driver', 'driver')
      .leftJoin('driver.user', 'driverUser')
      .select([
        'order.orderId AS "orderId"',
        'order.createdAt AS "createdAt"',
        'order.totalPrice AS "totalPrice"',
        'order.status AS "status"',
        'order.requestToRestaurant AS "requestToRestaurant"',
        'clientUser.name AS "clientName"',
        'driverUser.name AS "driverName"',
      ])
      .where('order.restaurantId = :restaurantId', { restaurantId })
      .getRawMany<{
        orderId: string;
        createdAt: Date;
        totalPrice: string;
        status: OrderStatus;
        requestToRestaurant: string | null;
        clientName: string;
        driverName: string | null;
      }>();

    return result;
  }
}
