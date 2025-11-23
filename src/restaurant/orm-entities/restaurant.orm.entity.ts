import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { DishEntity } from './dish.orm.entity';
import { OwnerEntity } from 'src/user/orm-entities/owner.orm.entity';
import { OrderEntity } from 'src/order/orm-entities/order.orm.entity';

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

  @Column()
  restaurantImgUrl: string;

  @Column({ nullable: true })
  restaurantImgUrl2: string;

  @Column({ nullable: true })
  restaurantImgUrl3: string;

  @OneToOne(() => OwnerEntity, (owner) => owner.restaurant)
  @JoinColumn({ name: 'ownerId' })
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
