import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantAddressEntity } from '../orm-entities/restaurantAddress.entity';
import { Repository } from 'typeorm';
import { ReadRestaurantAddressData } from '../types/read-restaurant-address-data';
import { CreateRestaurantAddressData } from '../types/create-restaurant-address-data';
import { UpdateRestaurantAddressData } from '../types/update-restaurant-address-data';

@Injectable()
export class RestaurantAddressRepository {
  constructor(
    @InjectRepository(RestaurantAddressEntity)
    private readonly restaurantAddressRepository: Repository<RestaurantAddressEntity>,
  ) {}

  async findOneByRestaurantId(
    restaurantId: string,
  ): Promise<ReadRestaurantAddressData> {
    const row = await this.restaurantAddressRepository
      .createQueryBuilder('ra')
      .select([
        'ra.restaurantAddressId as "restaurantAdressId"',
        'ra.restaurantId as "restaurantId"',
        'ra.streetAddress as "streetAddress"',
        'ra.unit as unit',
        'ra.state as state',
        'ra.city as city',
        'ra.zip as zip',
      ])
      .where('ra.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<ReadRestaurantAddressData>();

    if (!row) throw new Error('Restaurant Not Found');
    return row;
  }

  async findIdByRestaurantId(
    restaurantId: string,
  ): Promise<{ restaurantAddressId: string }> {
    const row = await this.restaurantAddressRepository
      .createQueryBuilder('ra')
      .select(['ra.restaurantAddressId as "restaurantAddressId"'])
      .where('ra.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<{ restaurantAddressId: string }>();

    if (!row) throw new Error('Restaurant Not Found');
    return row;
  }

  async findAllByRestaurantIds(
    restaurantIds: string[],
  ): Promise<ReadRestaurantAddressData[]> {
    return await this.restaurantAddressRepository
      .createQueryBuilder('ra')
      .select([
        'ra.restaurantAddressId as "restaurantAdressId"',
        'ra.restaurantId as "restaurantId"',
        'ra.streetAddress as "streetAddress"',
        'ra.unit as unit',
        'ra.state as state',
        'ra.city as city',
        'ra.zip as zip',
      ])
      .where('ra.restaurantId IN (:...restaurantIds)', { restaurantIds })
      .getRawMany<ReadRestaurantAddressData>();
  }

  save(data: CreateRestaurantAddressData) {
    return this.restaurantAddressRepository.save(
      this.restaurantAddressRepository.create(data),
    );
  }

  // done
  update(data: UpdateRestaurantAddressData) {
    return this.restaurantAddressRepository.save(
      this.restaurantAddressRepository.create(data),
    );
  }
}
