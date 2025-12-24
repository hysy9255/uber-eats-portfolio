import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DriverEntity } from './driver.orm.entity';
import { OwnerEntity } from './owner.orm.entity';
import { ClientEntity } from './client.orm.entity';
import { UserRole } from '../dto/user-output';
// import { CustomerEntity } from './customer.orm.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  // @OneToMany(() => CustomerEntity, (customer) => customer.user, {
  //   onDelete: 'CASCADE',
  // })
  // customers: CustomerEntity[];

  @OneToMany(() => OwnerEntity, (owner) => owner.user)
  owners: OwnerEntity[];

  @OneToMany(() => ClientEntity, (client) => client.user)
  clients: ClientEntity[];

  @OneToMany(() => DriverEntity, (driver) => driver.user)
  drivers: DriverEntity[];
}
