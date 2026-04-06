import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../orm-entities/restaurants.orm.entity';
import { ReadRestaurantData } from '../types/read-restaurant-data';
import { CreateRestaurantData } from '../types/create-restaurant-data';
import { UpdateRestaurantData } from '../types/update-restaurant-data';

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

  // done
  async update(data: UpdateRestaurantData) {
    return this.restaurantRepository.save(
      this.restaurantRepository.create(data),
    );
  }

  async findOneByOwnerId(ownerId: string): Promise<ReadRestaurantData> {
    const row = await this.restaurantRepository
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
      ])
      .where('r.ownerId = :ownerId', { ownerId })
      .getRawOne<ReadRestaurantData>();

    if (!row) throw Error('Restaurant Not Found');
    return row;
  }

  async findRestaurantIdByOwnerId(
    ownerId: string,
  ): Promise<{ restaurantId: string }> {
    const row = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .select('restaurant.restaurantId AS "restaurantId"')
      .where('restaurant.ownerId = :ownerId', { ownerId })
      .getRawOne<{ restaurantId: string }>();

    if (!row) throw new Error('Restaurant Not Found');

    return { restaurantId: row.restaurantId };
  }

  async findOneByOrderId(orderId: string): Promise<ReadRestaurantData> {
    const row = await this.restaurantRepository
      .createQueryBuilder('r')
      .leftJoin('r.orders', 'o')
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
      ])
      .where('o.orderId = :orderId', { orderId })
      .getRawOne<ReadRestaurantData>();

    if (!row) throw new Error('Restaurant Not Found');
    return row;
  }

  async findAllByOrderIds(
    orderIds: string[],
  ): Promise<(ReadRestaurantData & { orderId: string })[]> {
    return await this.restaurantRepository
      .createQueryBuilder('r')
      .leftJoin('r.orders', 'o')
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
        'o.orderId AS "orderId"',
      ])
      .where('o.orderId IN (:...orderIds)', { orderIds })
      .getRawMany<ReadRestaurantData & { orderId: string }>();
  }

  // done
  async findOneById(restaurantId: string): Promise<ReadRestaurantData> {
    const row = await this.restaurantRepository
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
      ])
      .where('r.restaurantId = :restaurantId', { restaurantId })
      .getRawOne<ReadRestaurantData>();

    if (!row) throw new Error('Restaurant Not Found');
    return row;
  }

  async findAll(): Promise<ReadRestaurantData[]> {
    return await this.restaurantRepository
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
      ])
      .getRawMany<ReadRestaurantData>();
  }

  async deleteOneById(restaurantId: string) {
    return this.restaurantRepository.delete({ restaurantId });
  }
}
