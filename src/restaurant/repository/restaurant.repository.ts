import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RestaurantEntity } from '../orm-entity/restaurants.orm.entity';
import { ReadRestaurantData } from '../types/restaurant/read-restaurant-data';
import { CreateRestaurantData } from '../types/restaurant/create-restaurant-data';
import { UpdateRestaurantData } from '../types/restaurant/update-restaurant-data';
import { ReadRestaurantDataSchema } from '../schema/read-restaurant-data.schema';
import { RestaurantViewRow } from '../types/restaurant-view-row';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  async save(data: CreateRestaurantData) {
    await this.restaurantRepository.save(
      this.restaurantRepository.create(data),
    );
  }

  async update(data: UpdateRestaurantData) {
    return this.restaurantRepository.save(
      this.restaurantRepository.create(data),
    );
  }

  async findOneByOwner(ownerId: string): Promise<ReadRestaurantData> {
    const row = await this.baseReadQb()
      .where('r.ownerId = :ownerId', { ownerId })
      .getRawOne<ReadRestaurantData>();

    if (!row) {
      throw new Error('Restaurant Not Found');
    }

    return this.parseOne(row);
  }

  async findByOwner(ownerId: string): Promise<RestaurantViewRow[]> {
    return await this.baseRestaurantViewQb()
      .where('r.ownerId = :ownerId', { ownerId })
      .getRawMany<RestaurantViewRow>();
  }

  async findById(restaurantId: string): Promise<RestaurantViewRow[]> {
    return await this.baseRestaurantViewQb()
      .where('r.restaurantId = :restaurantId', { restaurantId })
      .getRawMany<RestaurantViewRow>();
  }

  async findNameAndLogoById(restaurantId: string) {
    return await this.restaurantRepository
      .createQueryBuilder('r')
      .select(['r.dba AS "dba"', 'r.logo AS "logo"'])
      .where('r.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<{ dba: string; logo: string }>();
  }

  async findOneById(restaurantId: string): Promise<ReadRestaurantData> {
    const row = await this.baseReadQb()
      .where('r.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<ReadRestaurantData>();

    if (!row) {
      throw new Error('Restaurant Not Found');
    }

    return this.parseOne(row);
  }

  async find(): Promise<RestaurantViewRow[]> {
    return await this.baseRestaurantViewQb().getRawMany<RestaurantViewRow>();
  }

  private baseRestaurantViewQb(): SelectQueryBuilder<RestaurantEntity> {
    return this.baseReadQb()
      .leftJoin('r.address', 'a')
      .leftJoin('r.operatingHours', 'h')
      .addSelect([
        'a.streetAddress AS "streetAddress"',
        'a.unit AS "unit"',
        'a.state AS "state"',
        'a.city AS "city"',
        'a.zip AS "zip"',
        'h.dayOfWeek AS "dayOfWeek"',
        'h.openTime AS "openTime"',
        'h.closeTime AS "closeTime"',
        'h.open24Hours AS "open24Hours"',
        'h.closed AS "closed"',
      ]);
  }

  private baseReadQb(): SelectQueryBuilder<RestaurantEntity> {
    return this.restaurantRepository
      .createQueryBuilder('r')
      .select([
        'r.restaurantId AS "restaurantId"',
        'r.ownerId AS "ownerId"',
        'r.logo AS "logo"',
        'r.lbn AS "lbn"',
        'r.dba AS "dba"',
        'r.cuisineType AS "cuisineType"',
        'r.storePhone AS "storePhone"',
        'r.businessEmail AS "businessEmail"',
        'r.instagram AS "instagram"',
        'r.website AS "website"',
        'r.mainImgUrl AS "mainImgUrl"',
        'r.sub1ImgUrl AS "sub1ImgUrl"',
        'r.sub2ImgUrl AS "sub2ImgUrl"',
        'r.bannerImgUrl AS "bannerImgUrl"',
        'r.deliveryRadius AS "deliveryRadius"',
        'r.prepTime AS "prepTime"',
        'r.orderType AS "orderType"',
      ]);
  }

  private parseOne(row: unknown): ReadRestaurantData {
    const parsed = ReadRestaurantDataSchema.safeParse(row);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException('Invalid restaurant read model');
    }

    return parsed.data;
  }

  private parseMany(rows: unknown[]): ReadRestaurantData[] {
    const parsed = ReadRestaurantDataSchema.array().safeParse(rows);

    if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new InternalServerErrorException('Invalid restaurant read model');
    }

    return parsed.data;
  }
}
