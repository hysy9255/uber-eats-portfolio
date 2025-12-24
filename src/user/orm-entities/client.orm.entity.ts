import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../user.orm.entity';
import { OrderEntity } from 'src/order/orm-entities/order.orm.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryColumn()
  clientId: string;

  @Column({ type: 'varchar', nullable: true })
  deliveryAddress: string | null;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.clients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: OrderEntity[];
}
