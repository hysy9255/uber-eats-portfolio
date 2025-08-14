import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DishEntity } from '../../restaurant/orm-entities/dish.orm.entity';
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
  quantity: number;

  @ManyToOne(() => DishEntity, (dish) => dish.orderItems)
  @JoinColumn({ name: 'dishId' })
  dish: DishEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
