import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.orm.entity';
import { ClientEntity } from 'src/client/orm-entity/client.orm.entity';
import { RejectedDeliveryOrderEntity } from './rejected-delivery-order.orm.entity';
import { RestaurantEntity } from 'src/restaurant/orm-entity/restaurants.orm.entity';
import { DriverEntity } from 'src/driver/orm-entity/driver.orm.entity';
import { DeliveryType } from 'src/constants/deliveryType';
import { OrderStatus } from 'src/constants/orderStatus';
import { DeliveryAddressSnapshotEntity } from './delivery-address-snapshot.orm.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  orderId: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @Column({ type: 'varchar', nullable: true })
  requestToRestaurant: string | null;

  @Column({ type: 'varchar', nullable: true })
  requestToDriver: string | null;

  @Column()
  deliveryType: DeliveryType;

  @Column()
  restaurantId: string;

  @Column()
  clientId: string;

  @Column({ type: 'varchar', nullable: true })
  driverId: string | null;

  @ManyToOne(() => ClientEntity, (client) => client.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;

  @OneToOne(
    () => DeliveryAddressSnapshotEntity,
    (deliveryAddressSnapshot) => deliveryAddressSnapshot.order,
  )
  deliveryAddressSnapshot: DeliveryAddressSnapshotEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @ManyToOne(() => DriverEntity, (driver) => driver.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'driverId' })
  driver: DriverEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];

  @OneToMany(
    () => RejectedDeliveryOrderEntity,
    (rejectedDeliveryOrder) => rejectedDeliveryOrder.order,
  )
  rejectedDeliveryOrders: RejectedDeliveryOrderEntity[];
}
