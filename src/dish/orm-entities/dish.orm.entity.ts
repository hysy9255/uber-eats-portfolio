import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { OrderItemEntity } from 'src/order/orm-entities/order-item.orm.entity';
import { RestaurantEntity } from '../../restaurant/orm-entities/restaurants.orm.entity';

@Entity('dishes')
export class DishEntity {
  @PrimaryColumn()
  dishId: string;

  @Column()
  restaurantId: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  dishImgUrl?: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.dishes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.dish)
  orderItems: OrderItemEntity[];
}
