import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from './owner.orm.entity';
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

  async getOwnerByUserId(userId: string) {
    const row = await this.ownerRepository
      .createQueryBuilder('owner')
      .innerJoin('owner.restaurant', 'restaurant')
      .where('owner.userId = :userId', { userId })
      .select([
        'restaurant.restaurantId AS "restaurantId"',
        'owner.ownerId AS "ownerId"',
        'owner.userId AS "userId"',
      ])
      .getRawOne<{ restaurantId: string; userId: string; ownerId: string }>();

    if (!row) throw new Error('Owner Not Found');
    return row;
  }

  // done
  async getOwnerIdByUserId(userId: string): Promise<{ ownerId: string }> {
    const row = await this.ownerRepository
      .createQueryBuilder('o')
      .where('o.userId = :userId', { userId })
      .select(['o.ownerId AS "ownerId"'])
      .getRawOne<{ ownerId: string }>();

    if (!row) throw new Error('OwnerId Not Found');
    return row;
  }
}
