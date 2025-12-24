import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.orm.entity';
import { ClientEntity } from 'src/user/orm-entities/client.orm.entity';
import { DriverEntity } from 'src/user/orm-entities/driver.orm.entity';
import { OrderStatus } from '../dto/order-output';
import { RejectedDeliveryOrderEntity } from './rejected-delivery-order.orm.entity';
import { DeliveryType } from '../dto/order-input';
import { RestaurantEntityV2 } from 'src/restaurant/orm-entities/restaurantV2.orm.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  orderId: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column()
  totalPrice: string;

  @Column({ type: 'varchar', nullable: true })
  requestToRestaurant: string | null;

  @Column({ type: 'varchar', nullable: true })
  requestToDriver: string | null;

  @Column()
  deliveryType: DeliveryType;

  @Column({ nullable: true })
  deliveryAddress: string;

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

  @ManyToOne(() => RestaurantEntityV2, (restaurant) => restaurant.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntityV2;

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
