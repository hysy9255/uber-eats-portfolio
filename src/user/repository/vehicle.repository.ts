import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../orm-entities/vehicle.orm.entity';
import { CreateVehicleInput } from '../dto/user-input';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async saveVehicle(
    vehicleId: string,
    driverId: string,
    createVehicleInput: CreateVehicleInput,
  ) {
    await this.vehicleRepository.save(
      this.vehicleRepository.create({
        ...createVehicleInput,
        driverId,
        vehicleId,
      }),
    );
  }

  async findOneByLicensePlate(licensePlate: string) {
    return await this.vehicleRepository.findOneBy({ licensePlate });
  }
}
