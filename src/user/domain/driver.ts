import { Order } from 'src/order/domain/order';
import { OrderStatus } from 'src/order/dto/order-output';

export class Driver {
  constructor(
    private readonly _driverId: string,
    private readonly _userId: string,
  ) {}

  static fromPersistance(driverId: string, userId: string): Driver {
    return new Driver(driverId, userId);
  }

  accept(order: Order) {
    // Is this order status cooking or ready?
    order.ensureStatus([OrderStatus.Cooking, OrderStatus.Ready]);
    // Is this order assigned to another driver?
    order.ensureNoDriverAssigned();
    // Has this driver declined this delivery already?
    order.ensureNotDeclinedBy(this);
    // assign driver to order
    order.assign(this);
  }

  decline(order: Order) {
    // Is this order status cooking or ready?
    order.ensureStatus([OrderStatus.Cooking, OrderStatus.Ready]);
    // Is this order assigned to another driver?
    order.ensureNoDriverAssigned();
    // Has this driver declined this delivery already?
    order.ensureNotDeclinedBy(this);
    // add driver to rejected list
    order.addInRejected(this);
  }

  pickup(order: Order) {
    // Is the order status ready?
    order.ensureStatus([OrderStatus.Ready]);
    // Is this order assigned to this driver?
    order.ensureTakenBy(this);
    // mark order as picked up
    order.markPickedup();
  }

  complete(order: Order) {
    // Is the order status picked up?
    order.ensureStatus([OrderStatus.PickedUp]);
    // Is this order assigned to this driver?
    order.ensureTakenBy(this);
    // mark order as delivered
    order.markDelivered();
  }

  get userId() {
    return this._userId;
  }

  get driverId() {
    return this._driverId;
  }
}
