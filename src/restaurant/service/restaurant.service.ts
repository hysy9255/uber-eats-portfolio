import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../dto/restaurant-input';

import { OwnerRepository } from 'src/user/repository/owner.repository';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly sharedService: SharedService,
  ) {}

  async createRestaurant(
    userId: string,
    { name, address }: CreateRestaurantInput,
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
    );
  }

  async getRestaurants() {
    return await this.restaurantRepository.getRestaurants();
  }

  async getRestaurant(restaurantId: string) {
    return await this.restaurantRepository.getRestaurantById(restaurantId);
  }

  async updateRestaurant(
    userId: string,
    restaurantId: string,
    { name, address }: UpdateRestaurantInput,
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
