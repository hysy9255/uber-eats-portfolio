import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ClientEntity } from './client.orm.entity';
import { AddressAliasType } from 'src/constants/addressAliasType';

@Entity('delivery-address')
export class DeliveryAddressEntity {
  @PrimaryColumn()
  deliveryAddressId: string;

  @Column()
  streetAddress: string;

  @Column()
  apt: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  isDefault: boolean;

  @Column({ type: 'enum', enum: AddressAliasType })
  alias: AddressAliasType;

  @Column({ type: 'varchar', nullable: true })
  customAlias: string | null;

  @Column()
  clientId: string;

  @ManyToOne(() => ClientEntity, (client) => client.deliveryAddress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;
}
