import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { DishEntityV2 } from './dish.orm.entity';
import { OwnerEntity } from 'src/user/orm-entities/owner.orm.entity';
import { OrderEntity } from 'src/order/orm-entities/order.orm.entity';
import { OperatingHoursEntity } from './operatingHours.entity';

@Entity('restaurantsV2')
export class RestaurantEntityV2 {
  @PrimaryColumn()
  restaurantId: string;

  @Column()
  ownerId: string;

  @Column()
  lbn: string;

  @Column()
  dba: string;

  @Column()
  cuisineType: string;

  @Column()
  storePhone: string;

  @Column()
  businessEmail: string;

  @Column()
  website: string;

  @Column()
  instagram: string;

  // @Column()
  // country: string;

  // @Column()
  // state: string;

  @Column()
  mainImgUrl: string;

  @Column()
  sub1ImgUrl: string;

  @Column()
  sub2ImgUrl: string;

  @Column()
  streetAddress: string;

  @Column()
  unit: string;

  @Column()
  city: string;

  @Column()
  zip: string;

  @Column()
  deliveryRadius: number;

  @Column()
  prepTime: string;

  @Column()
  orderType: string;

  @OneToOne(() => OwnerEntity, (owner) => owner.restaurant)
  @JoinColumn({ name: 'ownerId' })
  owner: OwnerEntity;

  @OneToMany(() => DishEntityV2, (dish) => dish.restaurant, {
    onDelete: 'CASCADE',
  })
  dishes: DishEntityV2[];

  @OneToMany(() => OrderEntity, (order) => order.restaurant, {
    onDelete: 'CASCADE',
  })
  orders: OrderEntity[];

  @OneToMany(
    () => OperatingHoursEntity,
    (operatingHours) => operatingHours.restaurant,
    {
      // cascade: true,
      onDelete: 'CASCADE',
    },
  )
  operatingHours: OperatingHoursEntity[];
}
