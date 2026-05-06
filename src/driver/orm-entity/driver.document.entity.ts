import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { DriverEntity } from './driver.orm.entity';

@Entity('driver_documents')
export class DriverDocsEntity {
  @PrimaryColumn()
  documentId: string;

  @Column()
  driverId: string;

  @Column()
  license: string;

  @Column()
  insurance: string;

  @Column()
  additionalNotes: string;

  @OneToOne(() => DriverEntity, (driver) => driver.driverDocs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driverId' })
  driver: DriverEntity;
}
