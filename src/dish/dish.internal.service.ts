import { Injectable } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { DishMapper } from './dish.mapper';

@Injectable()
export class DishInternalService {
  constructor(
    private readonly dishRepo: DishRepository,
    private readonly dishMapper: DishMapper,
  ) {}

  hasDuplicateIds(dishIds: string[]) {
    const dishIdSet = new Set<string>();
    for (const dishId of dishIds) {
      if (dishIdSet.has(dishId)) {
        throw new Error('Duplicate dishId in order items');
      }
      dishIdSet.add(dishId);
    }
  }

  async exist(dishIds: string[]) {
    const dishes = await this.dishRepo.findByIds(dishIds);

    if (dishes.length !== dishIds.length) {
      throw new Error('Some dish does not exist');
    }
  }

  async existByRestaurant(restaurantId: string, dishIds: string[]) {
    const dishes = await this.dishRepo.findByIds(dishIds);

    for (const dish of dishes) {
      if (dish.restaurantId !== restaurantId) {
        throw new Error('dish does not belong to the restaurant');
      }
    }
  }
}
