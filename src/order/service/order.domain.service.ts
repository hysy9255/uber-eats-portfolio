import { Injectable } from '@nestjs/common';
import { OrderItem, OrderStatus } from '../dto/order-output';
import { DishRepository } from 'src/restaurant/repository/dish.repository';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { ClientRepository } from 'src/user/repository/client.repository';
import { DriverRepository } from 'src/user/repository/driver.repository';
import { OwnerRepository } from 'src/user/repository/owner.repository';
import { Order } from '../domain/order';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orm-entities/order.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDomainService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    private readonly dishRepository: DishRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly clientRepository: ClientRepository,
    private readonly ownerRepopsitory: OwnerRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  async getOrderDomainById(orderId: string) {
    const order = await this.orders
      .createQueryBuilder('o')
      .where('o.orderId = :orderId', {
        orderId,
      })
      .leftJoin('rejectedDeliveryOrders', 'rdo', 'o.orderId = rdo.orderId')
      .select('o.orderId, o.status, o.clientId, o.restaurantId, o.driverId')
      .addSelect(
        `COALESCE(
           ARRAY_AGG(DISTINCT rdo.driverId) FILTER (WHERE rdo.driverId IS NOT NULL),
           ARRAY[]::text[]
         )`,
        'rejectedDriverIds',
      )
      .groupBy(`o.orderId, o.status, o.clientId, o.restaurantId, o.driverId`)
      .getRawOne<{
        orderId: string;
        status: OrderStatus;
        clientId: string;
        restaurantId: string;
        driverId: string;
        rejectedDriverIds: string[];
      }>();

    if (!order) {
      throw new Error('Order not found');
    }
    return Order.fromPersistance(
      order.orderId,
      order.status,
      order.clientId,
      order.restaurantId,
      order.driverId ? order.driverId : null,
      order.rejectedDriverIds,
    );
  }

  async calculateTotalPrice(orderItems: OrderItem[]) {
    const dishIds = orderItems.map((item) => item.dishId);
    const dishes = await this.dishRepository.getDishesByIds(dishIds);
    const totalPrice = orderItems.reduce((total, item) => {
      const dish = dishes.find((d) => d.dishId === item.dishId);
      if (dish) {
        return total + dish.price * item.quantity;
      }
      return total;
    }, 0);
    return totalPrice.toFixed(2);
  }

  async validateRestaurantExists(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
  }

  async validateClientExists(userId: string) {
    const clientId = await this.clientRepository.getClientIdByUserId(userId);
    if (!clientId) throw new Error('Client not found');
    return clientId;
  }

  async validateOwnersRestaurantExists(userId: string) {
    const owner = await this.ownerRepopsitory.getOwnerByUserId(userId);
    if (!owner) throw new Error('Owner not found');
    const restaurant = await this.restaurantRepository.getRestaurantById(
      owner.restaurantId,
    );
    if (!restaurant) throw new Error('Restaurant not found for this owner');
    return restaurant.restaurantId;
  }

  async validateDriverExists(userId: string) {
    const driver = await this.driverRepository.getDriverByUserId(userId);
    if (!driver) throw new Error('Driver not found');
    return driver.driverId;
  }
}
