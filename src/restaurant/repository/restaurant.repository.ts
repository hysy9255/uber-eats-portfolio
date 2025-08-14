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

  async getRestaurantById(restaurantId: string) {
    return await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.restaurantId = :restaurantId', { restaurantId })
      .getOne();
  }

  async deleteRestaurant(restaurantId: string) {
    return this.restaurantRepository.delete({ restaurantId });
  }
}
