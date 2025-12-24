import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import {
  CreateBusinessInput,
  CreateLocationAndHoursInput,
  // CreateRestaurantInput,
  HoursDto,
  // UpdateRestaurantInput,
} from '../dto/restaurant-input';

import { OwnerRepository } from 'src/user/repository/owner.repository';
import { SharedService } from 'src/shared/shared.service';
import {
  OperatingHoursEntity,
  OperatingHoursInputType,
} from '../orm-entities/operatingHours.entity';
import { DishesByCategory, DishService } from './dish.service';
import { DishEntityV2 } from '../orm-entities/dish.orm.entity';

export type RestaurantId = string;

export type RestaurantViewV2 = {
  restaurantId: string;
  ownerId: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  instagram: string | null;
  mainImgUrl: string | null;
  sub1ImgUrl: string | null;
  sub2ImgUrl: string | null;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  deliveryRadius: number;
  prepTime: string;
  orderType: string;
  dishes: DishesByCategory;
  operatingHours: OperatingHoursEntity[];
};

export type RestaurantView = {
  restaurantId: string;
  ownerId: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  instagram: string | null;
  mainImgUrl: string | null;
  sub1ImgUrl: string | null;
  sub2ImgUrl: string | null;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  deliveryRadius: number;
  prepTime: string;
  orderType: string;
  dishes: DishEntityV2[];
  operatingHours: OperatingHoursEntity[];
};

export type UpdateRestaurantInputV3 = {
  lbn?: string;
  dba?: string;
  cuisineType?: string;
  storePhone?: string;
  businessEmail?: string;
  instagram?: string | null;
  website?: string | null;
  mainImgUrl?: string | null;
  sub1ImgUrl?: string | null;
  sub2ImgUrl?: string | null;
  streetAddress?: string;
  unit?: string;
  city?: string;
  state?: string;
  zip?: string;
  deliveryRadius?: number;
  prepTime?: string;
  orderType?: string;
  hours?: HoursDto;
};

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly sharedService: SharedService,
    private readonly dishService: DishService,
  ) {}

  async updateRestaurantV2(
    userId: string,
    updateRestaurantInput: UpdateRestaurantInputV3,
  ) {
    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    const restaurant =
      await this.restaurantRepository.getRestaurantByOwnerIdV2(ownerId);

    if (!restaurant) {
      throw new Error('Restaurant Not Foud');
    }

    await this.restaurantRepository.updateRestaurant(
      restaurant.restaurantId,
      updateRestaurantInput,
    );

    const hours = updateRestaurantInput.hours;

    if (hours) {
      const prevHours =
        await this.restaurantRepository.getOperatingHoursByRestaurantId(
          restaurant.restaurantId,
        );

      const updatedHours = prevHours.map((prevHour) => {
        return {
          id: prevHour.id,
          restaurantId: prevHour.restaurantId,
          dayOfWeek: prevHour.dayOfWeek,
          openTime: hours[`${prevHour.dayOfWeek}`].open,
          closeTime: hours[`${prevHour.dayOfWeek}`].close,
          open24Hours: hours[`${prevHour.dayOfWeek}`].open24,
          closed: hours[`${prevHour.dayOfWeek}`].closed,
        };
      });

      await this.restaurantRepository.saveOperatingHours(updatedHours);
      // const ophInput = Object.keys(hours).map((day) => ({
      //   id: this.sharedService.generateId(),
      //   restaurantId,
      //   dayOfWeek: day,
      //   openTime: hours[`${day}`].open,
      //   closeTime: hours[`${day}`].close,
      //   open24Hours: hours[`${day}`].open24,
      //   closed: hours[`${day}`].closed,
      // })) as OperatingHoursInputType[];
    }
  }

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

    await this.restaurantRepository.saveOperatingHours(ophInput);

    return restaurantId;
  }

  // async createRestaurant(
  //   userId: string,
  //   {
  //     name,
  //     address,
  //     restaurantImgUrl,
  //     restaurantImgUrl2,
  //     restaurantImgUrl3,
  //   }: CreateRestaurantInput,
  // ) {
  //   const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
  //   if (!ownerId) {
  //     throw new Error('Owner not found');
  //   }
  //   await this.restaurantRepository.saveRestaurant(
  //     this.sharedService.generateId(),
  //     ownerId,
  //     name,
  //     address,
  //     restaurantImgUrl,
  //     restaurantImgUrl2,
  //     restaurantImgUrl3,
  //   );
  // }

  // async getMyRestaurant(userId: string) {
  //   const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
  //   if (!ownerId) {
  //     throw new Error('Owner not found');
  //   }
  //   return await this.restaurantRepository.getRestaurantByOwnerId(ownerId);
  // }

  // async getRestaurants() {
  //   return await this.restaurantRepository.getRestaurants();
  // }

  async getRestaurantsV2() {
    return await this.restaurantRepository.getRestaurantsV2();
  }

  // async getRestaurant(restaurantId: string) {
  //   return await this.restaurantRepository.getRestaurantById(restaurantId);
  // }

  async getRestaurantV2(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.getRestaurantByIdV2(restaurantId);
    if (!restaurant) throw new NotFoundException('Restaurant is not found');
    return restaurant;
  }

  async getRestaurantView(id: string): Promise<RestaurantView> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant is not found');
    }

    const dishes = await this.dishService.listByRestaurant(id);
    return { ...restaurant, dishes };
  }

  async getRestaurantViewV2(id: string): Promise<RestaurantViewV2> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant is not found');
    }

    const dishes = await this.dishService.listByCategory(id);
    return { ...restaurant, dishes };
  }

  async getMyRestaurantView(ownerId: string) {
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

  // async updateRestaurant(
  //   userId: string,
  //   restaurantId: string,
  //   {
  //     name,
  //     address,
  //     restaurantImgUrl,
  //     restaurantImgUrl2,
  //     restaurantImgUrl3,
  //   }: UpdateRestaurantInput,
  // ) {
  //   const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
  //   if (!ownerId) {
  //     throw new Error('Owner not found');
  //   }
  //   const restaurant =
  //     await this.restaurantRepository.getRestaurantById(restaurantId);
  //   if (!restaurant) {
  //     throw new Error('Restaurant not found');
  //   }
  //   if (restaurant.ownerId !== ownerId) {
  //     throw new Error('You are not the owner of this restaurant');
  //   }

  //   await this.restaurantRepository.saveRestaurant(
  //     restaurantId,
  //     restaurant.ownerId,
  //     name ? name : restaurant.name,
  //     address ? address : restaurant.address,
  //     restaurantImgUrl ? restaurantImgUrl : restaurant.restaurantImgUrl,
  //     restaurantImgUrl2 ? restaurantImgUrl2 : restaurant.restaurantImgUrl2,
  //     restaurantImgUrl3 ? restaurantImgUrl3 : restaurant.restaurantImgUrl3,
  //   );
  // }

  async deleteRestaurantV2(ownerId: string) {
    const restaurantId =
      await this.restaurantRepository.getRestaurantIdByOwnerId(ownerId);
    if (!restaurantId) throw new Error('Restaurant ID Not Found');

    await this.restaurantRepository.deleteRestaurantV2(restaurantId);
  }

  // async deleteResetaurant(userId: string, restaurantId: string) {
  //   const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
  //   if (!ownerId) {
  //     throw new Error('Owner not found');
  //   }
  //   const restaurant =
  //     await this.restaurantRepository.getRestaurantById(restaurantId);
  //   if (!restaurant) {
  //     throw new Error('Restaurant not found');
  //   }
  //   if (restaurant.ownerId !== ownerId) {
  //     throw new Error('You are not the owner of this restaurant');
  //   }
  //   await this.restaurantRepository.deleteRestaurant(restaurantId);
  // }
}
