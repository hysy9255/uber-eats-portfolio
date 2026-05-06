import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.orm.entity';
import { DishEntity } from 'src/dish/orm-entity/dish.orm.entity';

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

  @ManyToOne(() => DishEntity, (dish) => dish.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dishId' })
  dish: DishEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
