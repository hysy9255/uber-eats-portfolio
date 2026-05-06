import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from 'src/order/orm-entity/order.orm.entity';

@Entity('delivery-address-snapshot')
export class DeliveryAddressSnapshotEntity {
  @PrimaryColumn()
  deliveryAddressSnapshotId: string;

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
  orderId: string;

  @OneToOne(() => OrderEntity, (order) => order.deliveryAddressSnapshot, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
