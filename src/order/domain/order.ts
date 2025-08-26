import { Driver } from 'src/user/domain/driver';
import { OrderStatus } from '../dto/order-output';
import { OrderEntity } from '../orm-entities/order.orm.entity';

export class Order {
  constructor(
    private readonly _orderId: string,
    private _status: OrderStatus = OrderStatus.Pending,
    private readonly _clientId: string,
    private readonly _restaurantId: string,
    private _driverId: string | null = null,
    private _rejectedDriverIds: string[] = [],
  ) {}

  static fromPersistance(
    orderId: string,
    status: OrderStatus,
    clientId: string,
    restaurantId: string,
    driverId: string | null,
    rejectedDriverIds: string[] = [],
  ) {
    return new Order(
      orderId,
      status,
      clientId,
      restaurantId,
      driverId,
      rejectedDriverIds,
    );
  }

  static toOrmEntity(order: Order) {
    const orderEntity = new OrderEntity();
    orderEntity.orderId = order._orderId;
    orderEntity.status = order._status;
    orderEntity.clientId = order._clientId;
    orderEntity.restaurantId = order._restaurantId;
    orderEntity.driverId = order._driverId;
    return orderEntity;
  }

  ensureStatus(expected: OrderStatus[]) {
    if (!expected.includes(this._status)) {
      throw new Error('Error');
    }
  }

  ensureNoDriverAssigned() {
    const driverAssigned = Boolean(this._driverId);
    if (driverAssigned) {
      throw new Error('This order is already assigned to a driver.');
    }
  }

  ensureNotDeclinedBy(driver: Driver) {
    const hasDeclined = this._rejectedDriverIds.includes(driver.driverId);
    if (hasDeclined) {
      throw new Error('You have already declined this delivery.');
    }
  }

  addInRejected(driver: Driver) {
    this._rejectedDriverIds.push(driver.driverId);
  }

  ensureTakenBy(driver: Driver) {
    if (this._driverId !== driver.driverId) {
      throw new Error('Error');
    }
  }

  markAccepted() {
    this._status = OrderStatus.Cooking;
  }

  markReady() {
    this._status = OrderStatus.Ready;
  }

  assign(driver: Driver) {
    this._driverId = driver.driverId;
  }

  markPickedup() {
    this._status = OrderStatus.PickedUp;
  }

  markDelivered() {
    this._status = OrderStatus.Delivered;
  }

  get orderId(): string {
    return this._orderId;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get clientId(): string {
    return this._clientId;
  }

  get restaurantId(): string {
    return this._restaurantId;
  }

  get driverId(): string | null {
    return this._driverId;
  }

  get rejectedDriverIds(): string[] {
    return this._rejectedDriverIds;
  }
  // constructor(
  //   private readonly _orderId: string,
  //   private readonly _restaurantId: string,
  //   private readonly _clientId: string,
  //   private _status: OrderStatus,
  //   private _driverId: string | null = null,
  //   private _rejectedDriverIds: string[] = [],
  // ) {}

  // static createNew(restaurantId: string, clientId: string): OrderEntity {
  //   return new OrderEntity(
  //     uuidv4(),
  //     restaurantId,
  //     clientId,
  //     OrderStatus.Pending,
  //   );
  // }

  // static fromPersistance(
  //   id: string,
  //   status: OrderStatus,
  //   restaurantId: string,
  //   clientId: string,
  //   driverId: string | null,
  //   rejectedDriverIds: string[],
  // ): OrderEntity {
  //   return new OrderEntity(
  //     id,
  //     restaurantId,
  //     clientId,
  //     status,
  //     driverId,
  //     rejectedDriverIds,
  //   );
  // }

  //   isOwnedBy(client: ClientEntity): boolean {
  //     return this._clientId === client.id;
  //   }

  //   private ensureNotRejectedBy(driver: DriverEntity) {
  //     if (this._rejectedDriverIds.includes(driver.id)) throw new Error('Error');
  //   }
  //   private ensureNotTakenBy(driver: DriverEntity) {
  //     if (this._driverId === driver.id) throw new Error('Error');
  //   }
  //   private ensureNotTakenByAnother(driver: DriverEntity) {
  //     if (this._driverId && this._driverId !== driver.id)
  //       throw new Error('Error');
  //   }
  //   private ensureTakenBySomeDriver() {
  //     if (!this._driverId) throw new Error('Error');
  //   }

  //   private ensureDriverCanAcceptOrReject(driver: DriverEntity) {
  //     // 오더가 해당 드라이버에 의해 이미 거절 되었으면 안됨
  //     this.ensureNotRejectedBy(driver);
  //     // 오더에 해당 드라이버가 이미 할당 되어있으면 안됨
  //     this.ensureNotTakenBy(driver);
  //     // 오더에 다른 드라이버가 이미 할당 되어있으면 안됨
  //     this.ensureNotTakenByAnother(driver);
  //   }

  //   private ensureDriverCanPickUpOrDeliver(driver: DriverEntity) {
  //     // 오더가 해당 드라이버에 의해 이미 거절 되었있으면 안됨
  //     this.ensureNotRejectedBy(driver);
  //     // 오더에 어떤 드라이버가 할당 되어있어야 함
  //     this.ensureTakenBySomeDriver();
  //     // 오더에 다른 드라이버가 할당 되어있으면 안됨
  //     this.ensureNotTakenByAnother(driver);
  //   }

  //   markRejectedByDriver(driver: DriverEntity) {
  //     this.ensureStatus(
  //       [OrderStatus.Accepted, OrderStatus.Ready],
  //       StatusErrMsg.notAcceptedNorReady,
  //     );
  //     this.ensureDriverCanAcceptOrReject(driver);
  //     this._rejectedDriverIds.push(driver.id);
  //   }

  //   markPickedUp(driver: DriverEntity) {
  //     this.ensureStatus([OrderStatus.Ready], StatusErrMsg.notReady);
  //     this.ensureDriverCanPickUpOrDeliver(driver);
  //     this._status = OrderStatus.PickedUp;
  //   }

  //   markDelivered(driver: DriverEntity) {
  //     this.ensureStatus([OrderStatus.PickedUp], StatusErrMsg.notPickedUp);
  //     this.ensureDriverCanPickUpOrDeliver(driver);
  //     driver.markOrderCompleted();
  //     this._status = OrderStatus.Delivered;
  //   }
}
