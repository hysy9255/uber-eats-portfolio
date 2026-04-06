import { OrderEntity } from 'src/order/orm-entities/order.orm.entity';
import { UserEntity } from 'src/user/user.orm.entity';
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
