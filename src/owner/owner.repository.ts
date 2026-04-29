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

  async save(userId: string, ownerId: string) {
    await this.ownerRepository.save(
      this.ownerRepository.create({ userId, ownerId }),
    );
  }

  async findOneById(ownerId: string): Promise<{ ownerId: string }> {
    const row = await this.ownerRepository
      .createQueryBuilder('owner')
      .innerJoin('owner.restaurant', 'restaurant')
      .where('owner.ownerId = :ownerId', { ownerId })
      .select(['owner.ownerId AS "ownerId"'])
      .getRawOne<{ ownerId: string }>();

    if (!row) throw new Error('Owner Not Found');
    return row;
  }

  async findOneByUser(userId: string) {
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
}
