import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DriverEntity } from './driver.orm.entity';
import { OwnerEntity } from './owner.orm.entity';
import { ClientEntity } from './client.orm.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => OwnerEntity, (owner) => owner.user, { onDelete: 'CASCADE' })
  owners: OwnerEntity[];

  @OneToMany(() => ClientEntity, (client) => client.user, {
    onDelete: 'CASCADE',
  })
  clients: ClientEntity[];

  @OneToMany(() => DriverEntity, (driver) => driver.user, {
    onDelete: 'CASCADE',
  })
  drivers: DriverEntity[];
}
