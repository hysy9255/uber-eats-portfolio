import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { RestaurantEntity } from 'src/restaurant/orm-entity/restaurants.orm.entity';
import { UserEntity } from 'src/user/orm-entity/user.orm.entity';

@Entity('owners')
export class OwnerEntity {
  @PrimaryColumn()
  ownerId: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.owners, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.owner)
  restaurant: RestaurantEntity;
}
