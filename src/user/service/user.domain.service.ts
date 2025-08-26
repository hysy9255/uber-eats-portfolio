import { Injectable } from '@nestjs/common';
import { Owner } from '../domain/owner';
import { OwnerRepository } from '../repository/owner.repository';
import { DriverRepository } from '../repository/driver.repository';
import { ClientRepository } from '../repository/client.repository';
import { Driver } from '../domain/driver';

@Injectable()
export class UserDomainService {
  constructor(
    private readonly ownerRepository: OwnerRepository,
    private readonly driverRepository: DriverRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  async getOwnerDomainByUserId(userId: string) {
    const owner = await this.ownerRepository.getOwnerByUserId(userId);
    if (!owner) {
      throw new Error('Owner not found');
    }

    return Owner.fromPersistance(
      owner.ownerId,
      owner.userId,
      owner.restaurantId,
    );
  }

  async getDriverDomainByUserId(userId: string) {
    const driver = await this.driverRepository.getDriverByUserId(userId);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return Driver.fromPersistance(driver.driverId, driver.userId);
  }
}
