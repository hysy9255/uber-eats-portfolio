import { Injectable } from '@nestjs/common';
import { OwnerRepository } from './owner.repository';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class OwnerInternalService {
  constructor(
    private readonly ownerRepository: OwnerRepository,
    private readonly sharedService: SharedService,
  ) {}

  // done
  async create(userId: string): Promise<{ ownerId: string }> {
    const ownerId = this.sharedService.generateId();
    await this.ownerRepository.saveOwner(userId, ownerId);
    return { ownerId };
  }

  // done
  async getOwnerIdByUserId(userId: string): Promise<{ ownerId: string }> {
    const owner = await this.ownerRepository.getOwnerByUserId(userId);
    return { ownerId: owner.ownerId };
  }
}
