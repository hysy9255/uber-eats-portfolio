import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../orm-entities/restaurant.orm.entity';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  saveRestaurant(
    restaurantId: string,
    ownerId: string,
    name: string,
    address: string,
  ) {
    return this.restaurantRepository.save(
      this.restaurantRepository.create({
        restaurantId,
        ownerId,
        name,
        address,
      }),
    );
  }

  async getRestaurants() {
    const result: RestaurantEntity[] = await this.restaurantRepository.query(
      'SELECT * FROM restaurants',
    );

    return result;
  }

  async getRestaurant(restaurantId: string) {
    const result: RestaurantEntity[] = await this.restaurantRepository.query(
      'SELECT * FROM restaurants WHERE restaurantId = $1',
      [restaurantId],
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  async deleteRestaurant(restaurantId: string) {
    return this.restaurantRepository.delete({ restaurantId });
  }
}
