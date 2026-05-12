import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerEntity } from '../orm-entity/owner.orm.entity';

@Injectable()
export class OwnerRepository {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  async save(userId: string, ownerId: string) {
    try {
      await this.ownerRepository.save(
        this.ownerRepository.create({ userId, ownerId }),
      );
    } catch (e) {
      console.error('Error saving owner:', e);
      throw new InternalServerErrorException(
        'Failed to save owner information',
      );
    }
  }

  async findOnebyUserId(userId: string) {
    return await this.ownerRepository
      .createQueryBuilder('o')
      .select(['o.ownerId as "ownerId"'])
      .where('o.userId = :userId', { userId })
      .getRawOne<{ ownerId: string }>();
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
