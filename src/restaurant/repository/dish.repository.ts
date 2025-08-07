import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishEntity } from '../orm-entities/dish.orm.entity';

@Injectable()
export class DishRepository {
  constructor(
    @InjectRepository(DishEntity)
    private readonly dishRepository: Repository<DishEntity>,
  ) {}

  saveDish(dishId: string, restaurantId: string, name: string, price: number) {
    return this.dishRepository.save(
      this.dishRepository.create({
        dishId,
        restaurantId,
        name,
        price,
      }),
    );
  }

  async getDishesByRestaurantId(restaurantId: string) {
    const result: DishEntity[] = await this.dishRepository.query(
      'SELECT * FROM dishes WHERE restaurantId = $1',
      [restaurantId],
    );

    return result;
  }

  async getDishById(dishId: string) {
    const result: DishEntity[] = await this.dishRepository.query(
      'SELECT * FROM dishes WHERE dishId = $1',
      [dishId],
    );
    return result[0];
  }

  async deleteDish(dishId: string) {
    await this.dishRepository.delete({ dishId });
  }

  async getDishesByIds(dishIds: string[]) {
    return await this.dishRepository
      .createQueryBuilder('dish')
      .where('dish.dishId IN (:...dishIds)', { dishIds })
      .getMany();
  }
}
