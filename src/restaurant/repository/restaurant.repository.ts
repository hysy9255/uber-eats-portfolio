import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RestaurantEntity } from '../orm-entities/restaurant.orm.entity';
import {
  CreateBusinessInput,
  CreateLocationAndHoursInput,
} from '../dto/restaurant-input';
import { RestaurantEntityV2 } from '../orm-entities/restaurantV2.orm.entity';
import { SharedService } from 'src/shared/shared.service';
import {
  OperatingHoursEntity,
  OperatingHoursInputType,
} from '../orm-entities/operatingHours.entity';
import { UpdateRestaurantInputV3 } from '../service/restaurant.service';

@Injectable()
export class RestaurantRepository {
  constructor(
    // @InjectRepository(RestaurantEntity)
    // private readonly restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantEntityV2)
    private readonly restaurantRepositoryV2: Repository<RestaurantEntityV2>,
    @InjectRepository(OperatingHoursEntity)
    private readonly operatingHoursRepository: Repository<OperatingHoursEntity>,
    private readonly sharedService: SharedService,
  ) {}

  saveOperatingHours(ophInput: OperatingHoursInputType[]) {
    return this.operatingHoursRepository.save(
      this.operatingHoursRepository.create(ophInput),
    );
  }

  getOperatingHoursByRestaurantId(restaurantId: string) {
    return this.operatingHoursRepository
      .createQueryBuilder('op')
      .where('op.restaurantId = :restaurantId', { restaurantId })
      .getMany();
  }

  // saveOperatingHours(restaurantId: string, hours: Record<Day, DayHours>) {
  //   const input = Object.keys(hours).map((day) => ({
  //     id: this.sharedService.generateId(),
  //     restaurantId,
  //     dayOfWeek: day,
  //     openTime: hours[`${day}`].open,
  //     closeTime: hours[`${day}`].close,
  //     open24Hours: hours[`${day}`].open24,
  //     closed: hours[`${day}`].closed,
  //   }));

  //   return this.operatingHoursRepository.save(
  //     this.operatingHoursRepository.create(input),
  //   );
  // }

  async updateRestaurant(
    restaurantId: string,
    {
      lbn,
      dba,
      cuisineType,
      storePhone,
      businessEmail,
      instagram,
      mainImgUrl,
      sub1ImgUrl,
      sub2ImgUrl,
      streetAddress,
      unit,
      state,
      city,
      zip,
      deliveryRadius,
      prepTime,
      orderType,
    }: UpdateRestaurantInputV3,
  ) {
    return this.restaurantRepositoryV2.save(
      this.restaurantRepositoryV2.create({
        restaurantId,
        lbn,
        dba,
        cuisineType,
        storePhone,
        businessEmail,
        instagram,
        mainImgUrl,
        sub1ImgUrl,
        sub2ImgUrl,
        streetAddress,
        unit,
        state,
        city,
        zip,
        deliveryRadius,
        prepTime,
        orderType,
      }),
    );
  }

  saveRestaurantV2(
    restaurantId: string,
    ownerId: string,
    createBusinessInput: CreateBusinessInput,
    {
      streetAddress,
      unit,
      city,
      state,
      zip,
      deliveryRadius,
      prepTime,
      orderType,
    }: CreateLocationAndHoursInput,
  ) {
    return this.restaurantRepositoryV2.save(
      this.restaurantRepositoryV2.create({
        restaurantId,
        ownerId,
        ...createBusinessInput,
        streetAddress,
        unit,
        city,
        state,
        zip,
        deliveryRadius: Number(deliveryRadius),
        prepTime,
        orderType,
      }),
    );
  }

  getRestaurantByIdV2(restaurantId: string) {
    return this.restaurantRepositoryV2
      .createQueryBuilder('restaurant')
      .where('restaurant.restaurantId = :restaurantId', { restaurantId })
      .getOne();
  }

  getRestaurantByOwnerIdV2(ownerId: string) {
    return this.restaurantRepositoryV2
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.operatingHours', 'operatingHours') // 1:1 관계 로드
      .where('restaurant.ownerId = :ownerId', { ownerId })
      .getOne();
  }

  async getRestaurantIdByOwnerId(ownerId: string) {
    const row = await this.restaurantRepositoryV2
      .createQueryBuilder('restaurant')
      .select('restaurant.restaurantId AS "restaurantId"')
      .where('restaurant.ownerId = :ownerId', { ownerId })
      .getRawOne<{ restaurantId: string }>();

    return row?.restaurantId ?? null;
  }

  findById(id: string) {
    return this.restaurantRepositoryV2
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.operatingHours', 'operatingHours') // 1:1 관계 로드
      .where('restaurant.restaurantId = :restaurantId', { restaurantId: id })
      .getOne();
  }

  // saveRestaurant(
  //   restaurantId: string,
  //   ownerId: string,
  //   name: string,
  //   address: string,
  //   restaurantImgUrl: string,
  //   restaurantImgUrl2: string,
  //   restaurantImgUrl3: string,
  // ) {
  //   return this.restaurantRepository.save(
  //     this.restaurantRepository.create({
  //       restaurantId,
  //       ownerId,
  //       name,
  //       address,
  //       restaurantImgUrl,
  //       restaurantImgUrl2,
  //       restaurantImgUrl3,
  //     }),
  //   );
  // }

  // async getRestaurantByOwnerId(ownerId: string) {
  //   return await this.restaurantRepository
  //     .createQueryBuilder('restaurant')
  //     .where('restaurant.ownerId = :ownerId', { ownerId })
  //     .getOne();
  // }

  // async getRestaurants() {
  //   const result: RestaurantEntity[] = await this.restaurantRepository.query(
  //     'SELECT * FROM restaurants',
  //   );

  //   return result;
  // }

  async getRestaurantsV2() {
    const result: RestaurantEntityV2[] =
      await this.restaurantRepositoryV2.query('SELECT * FROM "restaurantsV2"');

    return result;
  }

  // async getRestaurantById(restaurantId: string) {
  //   return await this.restaurantRepository
  //     .createQueryBuilder('restaurant')
  //     .where('restaurant.restaurantId = :restaurantId', { restaurantId })
  //     .getOne();
  // }

  // async deleteRestaurant(restaurantId: string) {
  //   return this.restaurantRepository.delete({ restaurantId });
  // }

  async deleteRestaurantV2(restaurantId: string) {
    return this.restaurantRepositoryV2.delete({ restaurantId });
  }
}
