import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateVehicleDTO } from '../dto/create-vehicle.input.dto';
import { CreateVehicleData } from '../types/create-vehicle-data';
import { CreateDriverDocsData } from '../types/create-driver-docs-data';
import { CreateDriverDocsDTO } from '../dto/creat-driver-docs.input.dto';

@Injectable()
export class DriverMapper {
  constructor(private readonly sharedService: SharedService) {}

  createVehicle(driverId: string, dto: CreateVehicleDTO): CreateVehicleData {
    const cvd = new CreateVehicleData();
    cvd.vehicleId = this.sharedService.generateId();
    cvd.driverId = driverId;
    cvd.color = dto.color;
    cvd.model = dto.model;
    cvd.year = dto.year;
    cvd.licensePlate = dto.licensePlate;
    return cvd;
  }

  createDriverDocs(
    driverId: string,
    dto: CreateDriverDocsDTO,
  ): CreateDriverDocsData {
    const cddd = new CreateDriverDocsData();
    cddd.driverDocsId = this.sharedService.generateId();
    cddd.driverId = driverId;
    cddd.license = dto.license;
    cddd.insurance = dto.insurance;
    cddd.additionalNotes = dto.additionalNotes;
    return cddd;
  }
}
