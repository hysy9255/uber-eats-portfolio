import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './orm-entities/order.orm.entity';
import { DriverEntity } from 'src/user/orm-entities/driver.orm.entity';

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
