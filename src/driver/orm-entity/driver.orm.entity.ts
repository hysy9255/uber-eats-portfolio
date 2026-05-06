import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrderEntity } from 'src/order/orm-entity/order.orm.entity';
import { RejectedDeliveryOrderEntity } from 'src/order/orm-entity/rejected-delivery-order.orm.entity';
import { UserEntity } from 'src/user/orm-entity/user.orm.entity';
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
