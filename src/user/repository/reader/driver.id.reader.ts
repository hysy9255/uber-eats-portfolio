import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '../../orm-entities/driver.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverIdReader {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
  ) {}

  async getDriverIdByUserId(userId: string): Promise<string | null> {
    const result = await this.driverRepository
      .createQueryBuilder('driver')
      .where('driver.userId = :userId', { userId })
      .select(['driver.driverId'])
      .getRawOne<{ driverId: string }>();

    return result?.driverId ?? null;
  }
}
