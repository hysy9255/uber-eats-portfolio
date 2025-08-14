import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '../orm-entities/driver.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverRepository {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
  ) {}

  async saveDriver(userId: string, driverId: string) {
    await this.driverRepository.save(
      this.driverRepository.create({ userId, driverId }),
    );
  }

  async getDriverByUserId(userId: string) {
    return await this.driverRepository
      .createQueryBuilder('driver')
      .where('driver.userId = :userId', { userId })
      .getOne();
  }
}
