import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user.orm.entity';
import { RestaurantEntity } from 'src/restaurant/orm-entities/restaurant.orm.entity';

@Entity('owners')
export class OwnerEntity {
  @PrimaryColumn()
  ownerId: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.owners)
  user: UserEntity;

  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.owner, {
    onDelete: 'CASCADE',
  })
  restaurant: RestaurantEntity;
}
