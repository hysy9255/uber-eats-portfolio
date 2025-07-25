import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { OwnerEntity } from './owner.orm.entity';
import { DishEntity } from './dish.orm.entity';
import { OrderEntity } from './order.orm.entity';

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryColumn()
  restaurantId: string;

  @Column()
  ownerId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToOne(() => OwnerEntity, (owner) => owner.restaurant)
  owner: OwnerEntity;

  @OneToMany(() => DishEntity, (dish) => dish.restaurant, {
    onDelete: 'CASCADE',
  })
  dishes: DishEntity[];

  @OneToMany(() => OrderEntity, (order) => order.restaurant, {
    onDelete: 'CASCADE',
  })
  orders: OrderEntity[];
}
