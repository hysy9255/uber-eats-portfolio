import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverEntity } from '../orm-entity/driver.orm.entity';
import { CreateVehicleData } from '../types/create-vehicle-data';
import { VehicleEntity } from '../orm-entity/vehicle.orm.entity';
import { CreateDriverDocsData } from '../types/create-driver-docs-data';
import { DriverDocsEntity } from '../orm-entity/driver.document.entity';

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

  async save(userId: string, driverId: string) {
    try {
      await this.driverRepository.save(
        this.driverRepository.create({ userId, driverId }),
      );
    } catch (e) {
      console.error('Error saving driver:', e);
      throw new InternalServerErrorException('Failed to save driver');
    }
  }

  async saveDriver(userId: string, driverId: string) {
    try {
      await this.driverRepository.save(
        this.driverRepository.create({ userId, driverId }),
      );
    } catch (e) {
      console.error('Error saving driver:', e);
      throw new InternalServerErrorException('Failed to save driver');
    }
  }

  async saveVehicle(data: CreateVehicleData) {
    try {
      await this.vehicleRepository.save(this.vehicleRepository.create(data));
    } catch (e) {
      console.error('Error saving vehicle:', e);
      throw new InternalServerErrorException('Failed to save vehicle');
    }
  }

  async findVehicleByLicensePlate(licensePlate: string) {
    try {
      return await this.vehicleRepository.findOneBy({ licensePlate });
    } catch (e) {
      console.error('Error finding vehicle by license plate:', e);
      throw new InternalServerErrorException('Failed to find vehicle');
    }
  }

  async saveDriverDocs(data: CreateDriverDocsData) {
    try {
      await this.driverDocsRepository.save(
        this.driverDocsRepository.create(data),
      );
    } catch (e) {
      console.error('Error saving driver documents:', e);
      throw new InternalServerErrorException('Failed to save driver documents');
    }
  }
}
