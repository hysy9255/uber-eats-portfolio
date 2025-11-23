import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { DriverEntity } from './driver.orm.entity';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryColumn()
  vehicleId: string;

  @Column()
  driverId: string;

  @Column()
  vehicleType: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  color: string;

  @Column({ unique: true })
  licensePlate: string;

  @OneToOne(() => DriverEntity, (driver) => driver.vehicle, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driverId' })
  driver: DriverEntity;
}
