import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { DriverEntity } from './driver.orm.entity';
import { OrderEntity } from './order.orm.entity';

@Entity('rejectedDeliveryOrders')
export class RejectedDeliveryOrderEntity {
  @PrimaryColumn()
  rejectedDeliveryOrderId: string;

  @Column()
  orderId: string;

  @Column()
  driverId: string;

  @ManyToOne(() => DriverEntity, (driver) => driver.rejectedDeliveryOrders)
  driver: DriverEntity;

  @ManyToOne(() => OrderEntity, (order) => order.rejectedDeliveryOrders)
  order: OrderEntity;
}
