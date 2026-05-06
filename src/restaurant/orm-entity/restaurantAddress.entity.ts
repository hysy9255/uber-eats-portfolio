import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { RestaurantEntity } from './restaurants.orm.entity';

@Entity('restaurantAddresses')
export class RestaurantAddressEntity {
  @PrimaryColumn()
  restaurantAddressId: string;

  @Column()
  restaurantId: string;

  @Column()
  streetAddress: string;

  @Column({ type: 'varchar', nullable: true })
  unit: string | null;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zip: string;

  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;
}
