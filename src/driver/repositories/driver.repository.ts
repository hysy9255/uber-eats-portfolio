import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverEntity } from '../orm-entities/driver.orm.entity';
import { CreateVehicleData } from '../types/create-vehicle-data';
import { VehicleEntity } from '../orm-entities/vehicle.orm.entity';
import { CreateDriverDocsData } from '../types/create-driver-docs-data';
import { DriverDocsEntity } from '../orm-entities/driver.document.entity';

@Injectable()
export class DriverRepository {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    @InjectRepository(DriverDocsEntity)
    private readonly driverDocsRepository: Repository<DriverDocsEntity>,
  ) {}

  // done
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

  // done
  async saveVehicle(data: CreateVehicleData) {
    await this.vehicleRepository.save(this.vehicleRepository.create(data));
  }

  // done
  async checkLicensePlateAvailability(
    licensePlate: string,
  ): Promise<{ available: boolean }> {
    const row = await this.vehicleRepository.findOneBy({ licensePlate });
    return { available: !row };
  }

  // done
  async saveDriverDocs(data: CreateDriverDocsData) {
    await this.driverDocsRepository.save(
      this.driverDocsRepository.create(data),
    );
  }
}
