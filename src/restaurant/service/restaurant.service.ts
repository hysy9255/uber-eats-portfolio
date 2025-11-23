import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import {
  CreateBusinessInput,
  CreateLocationAndHoursInput,
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../dto/restaurant-input';

import { OwnerRepository } from 'src/user/repository/owner.repository';
import { SharedService } from 'src/shared/shared.service';
import {
  OperatingHoursEntity,
  OperatingHoursInputType,
} from '../orm-entities/operatingHours.entity';
import { DishService } from './dish.service';
import { DishEntityV2 } from '../orm-entities/dish.orm.entity';

export type RestaurantId = string;

export type RestaurantView = {
  restaurantId: string;
  ownerId: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  instagram: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  streetAddress: string;
  unit: string;
  city: string;
  zip: string;
  deliveryRadius: number;
  prepTime: string;
  orderType: string;
  dishes: DishEntityV2[];
  operatingHours: OperatingHoursEntity[];
};

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly sharedService: SharedService,
    private readonly dishService: DishService,
  ) {}

  async createRestaurantV2(
    ownerId: string,
    createBusinessInput: CreateBusinessInput,
    createLocationAndHoursInput: CreateLocationAndHoursInput,
  ): Promise<RestaurantId> {
    const restaurantId = this.sharedService.generateId();
    await this.restaurantRepository.saveRestaurantV2(
      restaurantId,
      ownerId,
      createBusinessInput,
      createLocationAndHoursInput,
    );
    const hours = createLocationAndHoursInput.hours;

    const ophInput = Object.keys(hours).map((day) => ({
      id: this.sharedService.generateId(),
      restaurantId,
      dayOfWeek: day,
      openTime: hours[`${day}`].open,
      closeTime: hours[`${day}`].close,
      open24Hours: hours[`${day}`].open24,
      closed: hours[`${day}`].closed,
    })) as OperatingHoursInputType[];

    // console.log('this is ophInput:', ophInput);
    await this.restaurantRepository.saveOperatingHours(ophInput);

    return restaurantId;
  }

  async createRestaurant(
    userId: string,
    {
      name,
      address,
      restaurantImgUrl,
      restaurantImgUrl2,
      restaurantImgUrl3,
    }: CreateRestaurantInput,
  ) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }
    await this.restaurantRepository.saveRestaurant(
      this.sharedService.generateId(),
      ownerId,
      name,
      address,
      restaurantImgUrl,
      restaurantImgUrl2,
      restaurantImgUrl3,
    );
  }

  async getMyRestaurant(userId: string) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }
    return await this.restaurantRepository.getRestaurantByOwnerId(ownerId);
  }

  async getRestaurants() {
    return await this.restaurantRepository.getRestaurants();
  }

  async getRestaurantsV2() {
    return await this.restaurantRepository.getRestaurantsV2();
  }

  async getRestaurant(restaurantId: string) {
    return await this.restaurantRepository.getRestaurantById(restaurantId);
  }

  async getRestaurantV2(restaurantId: string) {
    return await this.restaurantRepository.getRestaurantByIdV2(restaurantId);
  }

  async getRestaurantView(id: string): Promise<RestaurantView> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant is not found');
    }

    const dishes = await this.dishService.listByRestaurant(id);
    return { ...restaurant, dishes };
  }

  async getMyRestaurantView(ownerId: string) {
    // console.log('this is ownerId:', ownerId);
    const restaurant =
      await this.restaurantRepository.getRestaurantByOwnerIdV2(ownerId);
    if (!restaurant)
      throw new NotFoundException(
        'Restaurant not found from get my restaurant view',
      );
    return restaurant;
  }

  async findById(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.getRestaurantByIdV2(restaurantId);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async updateRestaurant(
    userId: string,
    restaurantId: string,
    {
      name,
      address,
      restaurantImgUrl,
      restaurantImgUrl2,
      restaurantImgUrl3,
    }: UpdateRestaurantInput,
  ) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    if (restaurant.ownerId !== ownerId) {
      throw new Error('You are not the owner of this restaurant');
    }

    await this.restaurantRepository.saveRestaurant(
      restaurantId,
      restaurant.ownerId,
      name ? name : restaurant.name,
      address ? address : restaurant.address,
      restaurantImgUrl ? restaurantImgUrl : restaurant.restaurantImgUrl,
      restaurantImgUrl2 ? restaurantImgUrl2 : restaurant.restaurantImgUrl2,
      restaurantImgUrl3 ? restaurantImgUrl3 : restaurant.restaurantImgUrl3,
    );
  }

  async deleteResetaurant(userId: string, restaurantId: string) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    if (restaurant.ownerId !== ownerId) {
      throw new Error('You are not the owner of this restaurant');
    }
    await this.restaurantRepository.deleteRestaurant(restaurantId);
  }
}
