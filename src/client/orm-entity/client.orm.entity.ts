import { OrderEntity } from 'src/order/orm-entity/order.orm.entity';
import { UserEntity } from 'src/user/orm-entity/user.orm.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DeliveryAddressEntity } from './delivery-address.orm.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryColumn()
  clientId: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.clients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: OrderEntity[];

  @OneToMany(
    () => DeliveryAddressEntity,
    (deliveryAddress) => deliveryAddress.client,
  )
  deliveryAddress: DeliveryAddressEntity;
}
