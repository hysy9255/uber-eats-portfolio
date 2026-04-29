import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { DriverRepository } from './repositories/driver.repository';
import { CreateVehicleDTO } from './dto/create-vehicle.input.dto';
import { CreateDriverDocsDTO } from './dto/creat-driver-docs.input.dto';
import { DriverMapper } from './driver.mapper';

@Injectable()
export class DriverOnBoardService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly driverRepo: DriverRepository,
    private readonly driverMapper: DriverMapper,
  ) {}

  async onBoard(
    userId: string,
    vehicle: CreateVehicleDTO,
    documents: CreateDriverDocsDTO,
  ) {
    const driverId = this.sharedService.generateId();
    await this.driverRepo.save(userId, driverId);

    await this.registerVehicle(driverId, vehicle);
    await this.registerDocument(driverId, documents);
  }

  private async registerVehicle(driverId: string, dto: CreateVehicleDTO) {
    const licensePlate = dto.licensePlate;
    const vehicleExists =
      await this.driverRepo.checkLicensePlateAvailability(licensePlate);
    if (vehicleExists) {
      throw new Error('Given license plate already exists');
    }
    const createVehicleData = this.driverMapper.createVehicle(driverId, dto);
    await this.driverRepo.saveVehicle(createVehicleData);
  }

  private async registerDocument(driverId: string, dto: CreateDriverDocsDTO) {
    const createDriverDocsData = this.driverMapper.createDriverDocs(
      driverId,
      dto,
    );
    await this.driverRepo.saveDriverDocs(createDriverDocsData);
  }
}
