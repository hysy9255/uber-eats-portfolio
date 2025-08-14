import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { RestaurantEntity } from '../../restaurant/orm-entities/restaurant.orm.entity';
import { OrderItemEntity } from './order-item.orm.entity';
import { RejectedDeliveryOrderEntity } from '../rejected-delivery-order.orm.entity';
import { ClientEntity } from 'src/user/orm-entities/client.orm.entity';
import { DriverEntity } from 'src/user/orm-entities/driver.orm.entity';
import { OrderStatus } from '../dto/order-output';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  orderId: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column()
  totalPrice: string;

  @Column()
  note: string;

  @Column()
  deliveryAddress: string;

  @Column()
  restaurantId: string;

  @Column()
  clientId: string;

  @Column({ type: 'varchar', nullable: true })
  driverId: string | null;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @ManyToOne(() => DriverEntity, (driver) => driver.orders)
  @JoinColumn({ name: 'driverId' })
  driver: DriverEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItemEntity[];

  @OneToMany(
    () => RejectedDeliveryOrderEntity,
    (rejectedDeliveryOrder) => rejectedDeliveryOrder.order,
    { onDelete: 'CASCADE' },
  )
  rejectedDeliveryOrders: RejectedDeliveryOrderEntity[];
}
