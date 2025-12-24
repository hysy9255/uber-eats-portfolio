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

  @ManyToOne(() => UserEntity, (user) => user.drivers, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(
    () => RejectedDeliveryOrderEntity,
    (rejectedDeliveryOrder) => rejectedDeliveryOrder.driver,
  )
  rejectedDeliveryOrders: RejectedDeliveryOrderEntity[];

  @OneToMany(() => OrderEntity, (order) => order.driver)
  orders: OrderEntity[];

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.driver)
  vehicle: VehicleEntity;

  @OneToOne(() => DriverDocsEntity, (vehicle) => vehicle.driver)
  driverDocs: DriverDocsEntity;
}
