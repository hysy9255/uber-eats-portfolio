import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RestaurantEntity } from '../orm-entities/restaurants.orm.entity';
import { ReadRestaurantData } from '../types/read-restaurant-data';
import { CreateRestaurantData } from '../types/create-restaurant-data';
import { UpdateRestaurantData } from '../types/update-restaurant-data';
import { ReadRestaurantDataSchema } from '../schema/read-restaurant-data.schema';
import {
  RestaurantProps,
  RestaurantPropsSchema,
} from '../schema/restaurant-props.schema';

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

  async findRestaurantAggregate(restaurantId: string) {
    const rows = await this.restaurantRepository
      .createQueryBuilder('r')
      .leftJoin('r.dishes', 'd')
      .select(['r.restaurantId AS "restaurantId"', 'd.dishId AS "dishId"'])
      .where('r.restaurantId = :restaurantId', { restaurantId })
      .getRawMany<{ restaurantId: string; dishId: string }>();

    return rows;
  }

  async loadRestaurantAggregate(ownerId: string) {
    const row = await this.baseReadQb()
      .where('r.ownerId = :ownerId', { ownerId })
      .getRawOne<RestaurantProps>();

    if (!row) {
      throw new Error('Restaurant Not Found');
    }

    return RestaurantPropsSchema.parse(row);
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

  async findOneByOrder(orderId: string): Promise<ReadRestaurantData> {
    const row = await this.baseReadQb()
      .leftJoin('r.orders', 'o')
      .where('o.orderId = :orderId', { orderId })
      .getRawOne<ReadRestaurantData>();

    if (!row) {
      throw new Error('Restaurant Not Found');
    }

    return this.parseOne(row);
  }

  async findByOrders(orderIds: string[]): Promise<ReadRestaurantData[]> {
    const qb = this.baseReadQb().where('o.orderId IN (:...orderIds)', {
      orderIds,
    });
    const rows = await qb.getRawMany();
    return this.parseMany(rows);
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

  async find(): Promise<ReadRestaurantData[]> {
    const qb = this.baseReadQb();
    const rows = await qb.getRawMany();
    return this.parseMany(rows);
  }

  async deleteOneById(restaurantId: string) {
    return this.restaurantRepository.delete({ restaurantId });
  }

  private baseReadQb(): SelectQueryBuilder<RestaurantEntity> {
    return this.restaurantRepository
      .createQueryBuilder('r')
      .select([
        'r.restaurantId AS "restaurantId"',
        'r.ownerId AS "ownerId"',
        'r.logo AS logo',
        'r.lbn AS lbn',
        'r.dba AS dba',
        'r.cuisineType AS "cuisineType"',
        'r.storePhone AS "storePhone"',
        'r.businessEmail AS "businessEmail"',
        'r.instagram AS instagram',
        'r.website AS website',
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
