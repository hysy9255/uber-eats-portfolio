import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { DishEntity } from './dish.orm.entity';
import { OrderEntity } from './order.orm.entity';

@Entity('orderItems')
export class OrderItemEntity {
  @PrimaryColumn()
  orderItemId: string;

  @Column()
  dishId: string;

  @Column()
  orderId: string;

  @Column()
  quantity: string;

  @ManyToOne(() => DishEntity, (dish) => dish.orderItems)
  dish: DishEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;
}
