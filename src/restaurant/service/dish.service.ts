import { Injectable } from '@nestjs/common';
import { CreateDishInput, UpdateDishInput } from '../dto/dish-input';
import { DishRepository } from '../repository/dish.repository';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { OwnerRepository } from 'src/user/repository/owner.repository';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class DishService {
  constructor(
    private readonly dishRepository: DishRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly sharedService: SharedService,
  ) {}

  async createDish(
    userId: string,
    restaurantId: string,
    { name, price }: CreateDishInput,
  ) {
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant does not exist');
    }

    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    if (restaurant.ownerId !== ownerId) {
      throw new Error('You are not the owner of this restaurant');
    }
    const dishId = this.sharedService.generateId();
    await this.dishRepository.saveDish(dishId, restaurantId, name, price);
  }

  getDishes(restaurantId: string) {
    return this.dishRepository.getDishesByRestaurantId(restaurantId);
  }

  getDish(dishId: string) {
    return this.dishRepository.getDishById(dishId);
  }

  async updateDish(
    userId: string,
    restaurantId: string,
    dishId: string,
    { name, price }: UpdateDishInput,
  ) {
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant does not exist');
    }

    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    if (restaurant.ownerId !== ownerId) {
      throw new Error('You are not the owner of this restaurant');
    }

    const dish = await this.dishRepository.getDishById(dishId);
    if (!dish) {
      throw new Error('Dish does not exist');
    }

    if (dish.restaurantId !== restaurantId) {
      throw new Error('Dish does not belong to this restaurant');
    }

    await this.dishRepository.saveDish(
      dishId,
      dish.restaurantId,
      name ?? dish.name,
      price ?? dish.price,
    );
  }

  async deleteDish(userId: string, restaurantId: string, dishId: string) {
    const restaurant =
      await this.restaurantRepository.getRestaurantById(restaurantId);

    if (!restaurant) {
      throw new Error('Restaurant does not exist');
    }

    const ownerId = await this.ownerRepository.getOwnerIdByUserId(userId);
    if (!ownerId) {
      throw new Error('Owner not found');
    }

    if (restaurant.ownerId !== ownerId) {
      throw new Error('You are not the owner of this restaurant');
    }

    const dish = await this.dishRepository.getDishById(dishId);
    if (!dish) {
      throw new Error('Dish does not exist');
    }

    if (dish.restaurantId !== restaurantId) {
      throw new Error('Dish does not belong to this restaurant');
    }
    await this.dishRepository.deleteDish(dishId);
  }
}
