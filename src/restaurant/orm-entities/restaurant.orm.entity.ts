import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  // @OneToOne(() => OwnerEntity, (owner) => owner.restaurant, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'ownerId' })
  // owner: OwnerEntity;

  // @OneToMany(() => DishEntity, (dish) => dish.restaurant)
  // dishes: DishEntity[];

  // @OneToMany(() => OrderEntity, (order) => order.restaurant)
  // orders: OrderEntity[];
}
