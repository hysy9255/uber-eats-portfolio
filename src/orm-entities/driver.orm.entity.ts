import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.orm.entity';
import { RejectedDeliveryOrderEntity } from './rejected-delivery-order.orm.entity';
import { OrderEntity } from './order.orm.entity';

@Entity('drivers')
export class DriverEntity {
  @PrimaryColumn()
  driverId: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.drivers)
  user: UserEntity;

  @OneToMany(
    () => RejectedDeliveryOrderEntity,
    (rejectedDeliveryOrder) => rejectedDeliveryOrder.driver,
    { onDelete: 'CASCADE' },
  )
  rejectedDeliveryOrders: RejectedDeliveryOrderEntity[];

  @OneToMany(() => OrderEntity, (order) => order.driver, {
    onDelete: 'CASCADE',
  })
  orders: OrderEntity[];
}
