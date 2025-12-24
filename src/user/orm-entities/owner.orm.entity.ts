import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../user.orm.entity';
// import { RestaurantEntity } from 'src/restaurant/orm-entities/restaurant.orm.entity';
import { RestaurantEntityV2 } from 'src/restaurant/orm-entities/restaurantV2.orm.entity';

@Entity('owners')
export class OwnerEntity {
  @PrimaryColumn()
  ownerId: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.owners, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => RestaurantEntityV2, (restaurant) => restaurant.owner, {
    onDelete: 'CASCADE',
  })
  restaurant: RestaurantEntityV2;
}
