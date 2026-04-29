import { Injectable } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';

@Injectable()
export class DishValidationService {
  constructor(
    private readonly dish: DishRepository,
    private readonly restaurant: RestaurantRepository,
  ) {}

  private async validateDishOwnership(ownerId: string, dishId: string) {
    const { restaurantId } = await this.restaurant.findOneByOwner(ownerId);
    const dish = await this.dish.findOneById(dishId);
    if (dish.restaurantId !== restaurantId) {
      throw new Error('This dish does not belong to your restaurant');
    }
  }

  async updateDish(ownerId: string, dishId: string) {
    await this.validateDishOwnership(ownerId, dishId);
  }

  async deleteDish(ownerId: string, dishId: string) {
    await this.validateDishOwnership(ownerId, dishId);
  }
}
