import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.orm.entity';
import { DriverEntity } from 'src/user/orm-entities/driver.orm.entity';

@Entity('rejectedDeliveryOrders')
export class RejectedDeliveryOrderEntity {
  @PrimaryGeneratedColumn('uuid')
  rejectedDeliveryOrderId: string;

  @Column()
  orderId: string;

  @Column()
  driverId: string;

  @ManyToOne(() => DriverEntity, (driver) => driver.rejectedDeliveryOrders)
  @JoinColumn({ name: 'driverId' })
  driver: DriverEntity;

  @ManyToOne(() => OrderEntity, (order) => order.rejectedDeliveryOrders)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
