import { Module } from '@nestjs/common';
import { DriverInternalService } from './driver.internal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverRepository } from './repositories/driver.repository';
import { DriverEntity } from './orm-entities/driver.orm.entity';
import { DriverMapper } from './driver.mapper';
import { VehicleEntity } from './orm-entities/vehicle.orm.entity';
import { DriverDocsEntity } from './orm-entities/driver.document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverEntity, VehicleEntity, DriverDocsEntity]),
  ],
  providers: [DriverInternalService, DriverRepository, DriverMapper],
  exports: [DriverInternalService],
})
export class DriverModule {}
