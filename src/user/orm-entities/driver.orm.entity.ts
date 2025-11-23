import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../user.orm.entity';
import { OrderEntity } from 'src/order/orm-entities/order.orm.entity';
import { RejectedDeliveryOrderEntity } from 'src/order/orm-entities/rejected-delivery-order.orm.entity';
import { VehicleEntity } from './vehicle.orm.entity';
import { DriverDocsEntity } from './driver.document.entity';

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

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.driver, {
    onDelete: 'CASCADE',
  })
  vehicle: VehicleEntity;

  @OneToOne(() => DriverDocsEntity, (vehicle) => vehicle.driver, {
    onDelete: 'CASCADE',
  })
  driverDocs: DriverDocsEntity;
}
