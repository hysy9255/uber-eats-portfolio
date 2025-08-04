import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { RestaurantEntity } from '../../restaurant/orm-entities/restaurant.orm.entity';
import { OrderItemEntity } from './order-item.orm.entity';
import { RejectedDeliveryOrderEntity } from '../rejected-delivery-order.orm.entity';
import { ClientEntity } from 'src/user/orm-entities/client.orm.entity';
import { DriverEntity } from 'src/user/orm-entities/driver.orm.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  orderId: string;

  @Column()
  status: string;

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

  @Column()
  driverId: string;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client: ClientEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orders)
  restaurant: RestaurantEntity;

  @ManyToOne(() => DriverEntity, (driver) => driver.orders)
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
