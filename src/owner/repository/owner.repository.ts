import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerEntity } from '../orm-entity/owner.orm.entity';

@Injectable()
export class OwnerRepository {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly repo: Repository<OwnerEntity>,
  ) {}

  async save(userId: string, ownerId: string) {
    try {
      await this.repo.save(this.repo.create({ userId, ownerId }));
    } catch (e) {
      console.error('Error saving owner:', e);
      throw new InternalServerErrorException(
        'Failed to save owner information',
      );
    }
  }

  async findOnebyUserId(
    userId: string,
  ): Promise<{ ownerId: string } | undefined> {
    try {
      return await this.repo
        .createQueryBuilder('o')
        .select(['o.ownerId as "ownerId"'])
        .where('o.userId = :userId', { userId })
        .getRawOne<{ ownerId: string }>();
    } catch (e) {
      console.error('Error finding owner by userId:', e);
      throw new InternalServerErrorException(
        'Failed to find owner information by userId',
      );
    }
  }
}
