import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantAddressEntity } from '../orm-entity/restaurantAddress.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ReadRestaurantAddressData } from '../types/restaurant-address/read-restaurant-address-data';
import { CreateRestaurantAddressData } from '../types/restaurant-address/create-restaurant-address-data';
import { UpdateRestaurantAddressData } from '../types/restaurant-address/update-restaurant-address-data';
import { z } from 'zod';

const ReadRestaurantAddressDataSchema = z.object({
  restaurantAddressId: z.string(),
  restaurantId: z.string(),
  streetAddress: z.string(),
  unit: z.string(),
  state: z.string(),
  city: z.string(),
  zip: z.string(),
});

@Injectable()
export class RestaurantAddressRepository {
  constructor(
    @InjectRepository(RestaurantAddressEntity)
    private readonly address: Repository<RestaurantAddressEntity>,
  ) {}

  save(data: CreateRestaurantAddressData) {
    return this.address.save(this.address.create(data));
  }

  update(data: UpdateRestaurantAddressData) {
    return this.address.save(this.address.create(data));
  }

  async findOneByRestaurant(
    restaurantId: string,
  ): Promise<ReadRestaurantAddressData> {
    const row = await this.baseReadQb()
      .where('ra.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<ReadRestaurantAddressData>();

    if (!row) throw new Error('Restaurant Not Found');
    return this.parseOne(row);
  }

  async findByRestaurants(
    restaurantIds: string[],
  ): Promise<ReadRestaurantAddressData[]> {
    const qb = this.baseReadQb().where(
      'ra.restaurantId IN (:...restaurantIds)',
      { restaurantIds },
    );

    const rows = await qb.getRawMany();
    return this.parseMany(rows);
  }

  private baseReadQb(): SelectQueryBuilder<RestaurantAddressEntity> {
    return this.address
      .createQueryBuilder('ra')
      .select([
        'ra.restaurantAddressId as "restaurantAdressId"',
        'ra.restaurantId as "restaurantId"',
        'ra.streetAddress as "streetAddress"',
        'ra.unit as unit',
        'ra.state as state',
        'ra.city as city',
        'ra.zip as zip',
      ]);
  }

  private parseOne(row: unknown): ReadRestaurantAddressData {
    const parsed = ReadRestaurantAddressDataSchema.safeParse(row);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException(
        'Invalid restaurant address read model',
      );
    }

    return parsed.data;
  }

  private parseMany(rows: unknown[]): ReadRestaurantAddressData[] {
    const parsed = ReadRestaurantAddressDataSchema.array().safeParse(rows);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException(
        'Invalid restaurant address read model',
      );
    }

    return parsed.data;
  }
}
