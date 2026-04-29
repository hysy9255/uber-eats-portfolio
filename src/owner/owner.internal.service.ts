import { Injectable } from '@nestjs/common';
import { OwnerRepository } from './owner.repository';

@Injectable()
export class OwnerInternalService {
  constructor(private readonly ownerRep: OwnerRepository) {}

  async getOwnerByUser(userId: string): Promise<{ ownerId: string }> {
    const owner = await this.ownerRep.findOneByUser(userId);
    return { ownerId: owner.ownerId };
  }

  async getById(ownerId: string): Promise<{ ownerId: string }> {
    const result = await this.ownerRep.findOneById(ownerId);
    if (!result) throw new Error('Owner Not Found');
    return result;
  }

  async getIdByUser(userId: string): Promise<{ ownerId: string }> {
    return await this.ownerRep.findOneByUser(userId);
  }
}
