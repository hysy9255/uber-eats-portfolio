import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DishEntityV2 } from '../../restaurant/orm-entities/dish.orm.entity';
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

  @ManyToOne(() => DishEntityV2, (dish) => dish.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dishId' })
  dish: DishEntityV2;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
