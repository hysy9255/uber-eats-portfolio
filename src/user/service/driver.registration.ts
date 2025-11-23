import { Injectable } from '@nestjs/common';
import { CreateDriverDocsInput, CreateVehicleInput } from '../dto/user-input';
import { VehicleRepository } from '../repository/vehicle.repository';
import { DriverDocsRepository } from '../repository/driver.docs.repository';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class DriverRegistration {
  constructor(
    private readonly sharedService: SharedService,
    private readonly vehicleRepository: VehicleRepository,
    private readonly driverDocsRepository: DriverDocsRepository,
  ) {}

  async registerVehicle(
    driverId: string,
    createVehicleInput: CreateVehicleInput,
  ) {
    const licensePlate = createVehicleInput.licensePlate;
    const vehicleExists =
      await this.vehicleRepository.findOneByLicensePlate(licensePlate);
    if (vehicleExists) {
      throw new Error('Given license plate already exists');
    }
    const vehicleId = this.sharedService.generateId();
    await this.vehicleRepository.saveVehicle(
      vehicleId,
      driverId,
      createVehicleInput,
    );
  }

  async registerDocument(
    driverId: string,
    CreateDriverDocsInput: CreateDriverDocsInput,
  ) {
    const documentId = this.sharedService.generateId();
    await this.driverDocsRepository.saveDriverDocs(
      documentId,
      driverId,
      CreateDriverDocsInput,
    );
  }
}
