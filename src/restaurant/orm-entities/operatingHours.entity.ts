import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RestaurantEntity } from './restaurants.orm.entity';

@Entity('operating_hours')
export class OperatingHoursEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  restaurantId: string;

  @Column()
  dayOfWeek: string;

  @Column()
  openTime: string;

  @Column()
  closeTime: string;

  @Column()
  open24Hours: boolean;

  @Column()
  closed: boolean;

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.operatingHours,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;
}
