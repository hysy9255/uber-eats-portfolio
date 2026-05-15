import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantAddressEntity } from '../orm-entity/restaurantAddress.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ReadRestaurantAddressData } from '../types/restaurant-address/read-restaurant-address-data';
import { CreateRestaurantAddressData } from '../types/restaurant-address/create-restaurant-address-data';
import { UpdateRestaurantAddressData } from '../types/restaurant-address/update-restaurant-address-data';

@Injectable()
export class RestaurantAddressRepository {
  constructor(
    @InjectRepository(RestaurantAddressEntity)
    private readonly address: Repository<RestaurantAddressEntity>,
  ) {}

  async save(data: CreateRestaurantAddressData) {
    try {
      await this.address.save(this.address.create(data));
    } catch (e) {
      console.error('Error saving restaurant address:', e);
      throw new InternalServerErrorException(
        'Failed to save restaurant address',
      );
    }
  }

  async update(data: UpdateRestaurantAddressData) {
    await this.address.save(this.address.create(data));
  }

  async findOneByRestaurant(
    restaurantId: string,
  ): Promise<ReadRestaurantAddressData | undefined> {
    return await this.baseReadQb()
      .where('ra.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<ReadRestaurantAddressData>();
  }

  async findByRestaurants(
    restaurantIds: string[],
  ): Promise<ReadRestaurantAddressData[]> {
    const qb = this.baseReadQb().where(
      'ra.restaurantId IN (:...restaurantIds)',
      { restaurantIds },
    );

    return await qb.getRawMany();
  }

  private baseReadQb(): SelectQueryBuilder<RestaurantAddressEntity> {
    return this.address
      .createQueryBuilder('ra')
      .select([
        'ra.restaurantAddressId as "restaurantAddressId"',
        'ra.restaurantId as "restaurantId"',
        'ra.streetAddress as "streetAddress"',
        'ra.unit as unit',
        'ra.state as state',
        'ra.city as city',
        'ra.zip as zip',
      ]);
  }
}
