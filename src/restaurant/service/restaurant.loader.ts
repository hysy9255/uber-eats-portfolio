import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';

@Injectable()
export class RestaurantLoader {
  constructor(private readonly restaurantRepo: RestaurantRepository) {}

  async load(ownerId: string) {
    const data = await this.restaurantRepo.loadRestaurantAggregate(ownerId);
    console.log(data);
    // return new Restaurant(data);
  }
}
