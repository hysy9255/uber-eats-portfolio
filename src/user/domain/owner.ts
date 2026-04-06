import { OrderStatus } from 'src/constants/orderStatus';
import { Order } from 'src/order/domain/order';

export class Owner {
  constructor(
    private readonly _ownerId: string,
    private readonly _userId: string,
    private _restaurantId?: string,
  ) {}

  static fromPersistance(
    ownerId: string,
    userId: string,
    restaurantId?: string,
  ): Owner {
    return new Owner(ownerId, userId, restaurantId);
  }

  ensureOrderBelongsToMyRestaurant(order: Order) {
    if (order.restaurantId !== this._restaurantId) {
      throw new Error('This order does not belong to your restaurant.');
    }
  }

  accept(order: Order) {
    // Is this order status pending?
    order.ensureStatus([OrderStatus.Pending]);
    // Is this order belongs to my restaurant?
    this.ensureOrderBelongsToMyRestaurant(order);
    // mark order as accepted
    order.markAccepted();
  }

  donePreparing(order: Order) {
    // Is this order status cooking?
    order.ensureStatus([OrderStatus.Cooking]);
    // Is this order belongs to my restaurant?
    this.ensureOrderBelongsToMyRestaurant(order);
    // mark order as ready
    order.markReady();
  }
}
