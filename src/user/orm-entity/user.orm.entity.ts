import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ClientEntity } from '../../client/orm-entity/client.orm.entity';
import { DriverEntity } from 'src/driver/orm-entity/driver.orm.entity';
import { UserRole } from 'src/constants/userRole';
import { OwnerEntity } from 'src/owner/orm-entity/owner.orm.entity';

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

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  profileImgUrl: string | null;

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
