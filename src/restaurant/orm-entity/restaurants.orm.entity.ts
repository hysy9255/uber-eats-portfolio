import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrderEntity } from 'src/order/orm-entity/order.orm.entity';
import { OperatingHoursEntity } from './operatingHours.entity';
import { DishEntity } from '../../dish/orm-entity/dish.orm.entity';
import { RestaurantAddressEntity } from './restaurantAddress.entity';
import { OrderType } from 'src/constants/orderType';
import { OwnerEntity } from 'src/owner/orm-entity/owner.orm.entity';

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryColumn()
  restaurantId: string;

  @Column()
  ownerId: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string | null;

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

  @Column({ type: 'varchar', nullable: true })
  website: string | null;

  @Column({ type: 'varchar', nullable: true })
  instagram: string | null;

  @Column()
  mainImgUrl: string;

  @Column()
  sub1ImgUrl: string;

  @Column()
  sub2ImgUrl: string;

  @Column({ type: 'varchar', nullable: true })
  bannerImgUrl: string | null;

  @Column()
  deliveryRadius: number;

  @Column()
  prepTime: number;

  @Column()
  orderType: OrderType;

  @OneToOne(() => RestaurantAddressEntity, (address) => address.restaurant)
  address: RestaurantAddressEntity;

  @OneToOne(() => OwnerEntity, (owner) => owner.restaurant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: OwnerEntity;

  @OneToMany(() => DishEntity, (dish) => dish.restaurant)
  dishes: DishEntity[];

  @OneToMany(() => OrderEntity, (order) => order.restaurant)
  orders: OrderEntity[];

  @OneToMany(
    () => OperatingHoursEntity,
    (operatingHours) => operatingHours.restaurant,
  )
  operatingHours: OperatingHoursEntity[];
}
