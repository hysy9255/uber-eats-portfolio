import { Injectable } from '@nestjs/common';
import { OrderItem } from '../dto/order-output';
import { ReadDishData } from 'src/dish/types/read-dish-data';
import { OrderStatus } from 'src/constants/orderStatus';

export type RawOrder = {
  orderId: string;
  status: OrderStatus;
  clientId: string;
  restaurantId: string;
  driverId: string | null;
  rejectedDriverIds: string[];
};

@Injectable()
export class OrderDomainService {
  // async getOrderDomainById(orderId: string) {
  //   const order = await this.orders
  //     .createQueryBuilder('o')
  //     .where('o.orderId = :orderId', {
  //       orderId,
  //     })
  //     .leftJoin('rejectedDeliveryOrders', 'rdo', 'o.orderId = rdo.orderId')
  //     .select('o.orderId, o.status, o.clientId, o.restaurantId, o.driverId')
  //     .addSelect(
  //       `COALESCE(
  //          ARRAY_AGG(DISTINCT rdo.driverId) FILTER (WHERE rdo.driverId IS NOT NULL),
  //          ARRAY[]::text[]
  //        )`,
  //       'rejectedDriverIds',
  //     )
  //     .groupBy(`o.orderId, o.status, o.clientId, o.restaurantId, o.driverId`)
  //     .getRawOne<RawOrder>();

  //   if (!order) {
  //     throw new Error('Order not found');
  //   }
  //   return OrderMapper.toDomain(order);
  // }

  calculateTotalPrice(orderItems: OrderItem[], dishes: ReadDishData[]): number {
    const totalPrice = orderItems.reduce((total, item) => {
      const dish = dishes.find((d) => d.dishId === item.dishId);
      if (dish) {
        return total + dish.price * item.quantity;
      }
      return total;
    }, 0);
    return Number(totalPrice.toFixed(2));
  }

  // async calculateTotalPrice(orderItems: OrderItem[]) {
  //   const dishIds = orderItems.map((item) => item.dishId);
  //   const dishes = await this.dishRepository.findAllByIds(dishIds);
  //   const totalPrice = orderItems.reduce((total, item) => {
  //     const dish = dishes.find((d) => d.dishId === item.dishId);
  //     if (dish) {
  //       return total + dish.price * item.quantity;
  //     }
  //     return total;
  //   }, 0);
  //   return totalPrice.toFixed(2);
  // }

  // async validateOwnersRestaurantExists(userId: string) {
  //   const owner = await this.ownerRepopsitory.getOwnerByUserId(userId);
  //   if (!owner) throw new Error('Owner not found');
  //   const restaurant = await this.restaurantRepository.getRestaurantById(
  //     owner.restaurantId,
  //   );
  //   if (!restaurant) throw new Error('Restaurant not found for this owner');
  //   return restaurant.restaurantId;
  // }
}
