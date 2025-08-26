import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from '../orm-entities/owner.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerRepository {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  async saveOwner(userId: string, ownerId: string) {
    await this.ownerRepository.save(
      this.ownerRepository.create({ userId, ownerId }),
    );
  }

  getOwnerByUserId(userId: string) {
    return this.ownerRepository
      .createQueryBuilder('owner')
      .innerJoin('owner.restaurant', 'restaurant')
      .where('owner.userId = :userId', { userId })
      .select([
        'restaurant.restaurantId AS "restaurantId"',
        'owner.ownerId AS "ownerId"',
        'owner.userId AS "userId"',
      ])
      .getRawOne<{ restaurantId: string; userId: string; ownerId: string }>();
  }

  async getOwnerIdByUserId(userId: string) {
    const row = await this.ownerRepository
      .createQueryBuilder('owner')
      .where('owner.userId = :userId', { userId })
      .select(['owner.ownerId'])
      .getRawOne<{ ownerId: string }>();

    return row?.ownerId ?? null;
  }
}
