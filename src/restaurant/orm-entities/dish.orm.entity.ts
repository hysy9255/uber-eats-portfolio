import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { OrderItemEntity } from 'src/order/orm-entities/order-item.orm.entity';
import { RestaurantEntity } from './restaurant.orm.entity';
import { RestaurantEntityV2 } from './restaurantV2.orm.entity';

export type CreateMenuInput = {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl: string;
};

export type UpdateMenuInput = {
  dishId: string;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  dishImgUrl?: string;
};

export
@Entity('dishes')
class DishEntity {
  @PrimaryColumn()
  dishId: string;

  @Column()
  restaurantId: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  dishImgUrl: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.dishes)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.dish, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItemEntity[];
}

@Entity('dishesV2')
export class DishEntityV2 {
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

  @ManyToOne(() => RestaurantEntityV2, (restaurant) => restaurant.dishes)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntityV2;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.dish, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItemEntity[];
}
