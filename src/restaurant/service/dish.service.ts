import { Injectable } from '@nestjs/common';
import { CreateDishInput, UpdateDishInput } from '../dto/dish-input';
import { DishRepository } from '../repository/dish.repository';
import { v4 as uuidv4 } from 'uuid';
import { RestaurantRepository } from '../repository/restaurant.repository';

@Injectable()
export class DishService {
  constructor(
    private readonly dishRepository: DishRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async createDish(restaurantId: string, { name, price }: CreateDishInput) {
    const restaurantExists =
      await this.restaurantRepository.getRestaurantById(restaurantId);

    if (!restaurantExists) {
      throw new Error('Restaurant does not exist');
    }
    const dishId = uuidv4();
    await this.dishRepository.saveDish(dishId, restaurantId, name, price);
  }

  getDishes(restaurantId: string) {
    return this.dishRepository.getDishesByRestaurantId(restaurantId);
  }

  getDish(dishId: string) {
    return this.dishRepository.getDishById(dishId);
  }

  async updateDish(dishId: string, { name, price }: UpdateDishInput) {
    const dish = await this.dishRepository.getDishById(dishId);
    if (!dish) {
      throw new Error('Dish does not exist');
    }

    await this.dishRepository.saveDish(
      dishId,
      dish.restaurantId,
      name ?? dish.name,
      price ?? dish.price,
    );
  }

  async deleteDish(dishId: string) {
    await this.dishRepository.deleteDish(dishId);
  }
}
