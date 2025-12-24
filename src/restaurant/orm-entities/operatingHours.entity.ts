import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RestaurantEntityV2 } from './restaurantV2.orm.entity';

export type OperatingHoursInputType = {
  id: string;
  restaurantId: string;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  open24Hours: boolean;
  closed: boolean;
};

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
    () => RestaurantEntityV2,
    (restaurant) => restaurant.operatingHours,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntityV2;
}
