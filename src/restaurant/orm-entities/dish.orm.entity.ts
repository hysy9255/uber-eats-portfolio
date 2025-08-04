import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderItemEntity } from 'src/order/orm-entities/order-item.orm.entity';
import { RestaurantEntity } from './restaurant.orm.entity';

@Entity('dishes')
export class DishEntity {
  @PrimaryColumn()
  dishId: string;

  @Column()
  restaurantId: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.dishes)
  restaurant: RestaurantEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.dish, {
    onDelete: 'CASCADE',
  })
  orderItems: OrderItemEntity[];
}
