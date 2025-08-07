import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../dto/restaurant-input';
import { UserRepository } from 'src/user/repository/user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createRestaurant(
    ownerId: string,
    { name, address }: CreateRestaurantInput,
  ) {
    const owner = await this.userRepository.getUserById(ownerId);
    if (!owner) {
      throw new Error('Owner not found');
    }
    await this.restaurantRepository.saveRestaurant(
      uuidv4(),
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
    restaurantId: string,
    { name, address }: UpdateRestaurantInput,
  ) {
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    await this.restaurantRepository.saveRestaurant(
      restaurantId,
      restaurant.ownerId,
      name ? name : restaurant.name,
      address ? address : restaurant.address,
    );
  }

  async deleteResetaurant(restaurantId: string) {
    await this.restaurantRepository.deleteRestaurant(restaurantId);
  }
}
