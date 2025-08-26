import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from 'src/restaurant/orm-entities/restaurant.orm.entity';
import { OwnerEntity } from '../../orm-entities/owner.orm.entity';

@Injectable()
export class RestaurantIdReader {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  async getRestaurantIdByOwnerUserId(userId: string): Promise<string | null> {
    const result = await this.restaurantRepository
      .createQueryBuilder('r')
      .innerJoin('r.owner', 'owner')
      .where('owner.userId = :userId', { userId })
      .select('r.restaurantId', 'restaurantId')
      .getRawOne<{ restaurantId: string }>();

    return result?.restaurantId ?? null;
  }
}
