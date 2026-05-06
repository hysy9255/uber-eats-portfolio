import { Module } from '@nestjs/common';
import { DriverOnBoardService } from './service/driver.onboard.service';
import { DriverMapper } from './mapper/driver.mapper';

@Module({
  imports: [],
  providers: [DriverMapper, DriverOnBoardService],
  exports: [DriverOnBoardService],
})
export class DriverModule {}
