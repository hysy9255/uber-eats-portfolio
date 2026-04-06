import { Injectable } from '@nestjs/common';
import { DriverRepository } from './repositories/driver.repository';
import { SharedService } from 'src/shared/shared.service';
import { CreateVehicleDTO } from './dto/create-vehicle.input.dto';
import { DriverMapper } from './driver.mapper';
import { CreateDriverDocsDTO } from './dto/creat-driver-docs.input.dto';

@Injectable()
export class DriverInternalService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly driverRepository: DriverRepository,
    private readonly driverMapper: DriverMapper,
  ) {}

  // done
  async create(userId: string): Promise<{ driverId: string }> {
    const driverId = this.sharedService.generateId();
    await this.driverRepository.saveDriver(userId, driverId);
    return { driverId };
  }

  // done
  async registerVehicle(driverId: string, dto: CreateVehicleDTO) {
    const licensePlate = dto.licensePlate;
    const vehicleExists =
      await this.driverRepository.checkLicensePlateAvailability(licensePlate);
    if (vehicleExists) {
      throw new Error('Given license plate already exists');
    }
    const createVehicleData = this.driverMapper.createVehicle(driverId, dto);
    await this.driverRepository.saveVehicle(createVehicleData);
  }

  // done
  async registerDocument(driverId: string, dto: CreateDriverDocsDTO) {
    const createDriverDocsData = this.driverMapper.createDriverDocs(
      driverId,
      dto,
    );
    await this.driverRepository.saveDriverDocs(createDriverDocsData);
  }
}
