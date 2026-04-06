import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishEntity } from './orm-entities/dish.orm.entity';
import { CreateDishData } from './types/create-dish-data';
import { UpdateDishData } from './types/update-dish-data';
import { ReadDishData } from './types/read-dish-data';

@Injectable()
export class DishRepository {
  constructor(
    @InjectRepository(DishEntity)
    private readonly dishRepository: Repository<DishEntity>,
  ) {}

  async saveOne(data: CreateDishData) {
    await this.dishRepository.save(this.dishRepository.create(data));
  }

  async saveMultiple(data: CreateDishData[]) {
    await this.dishRepository.save(this.dishRepository.create(data));
  }

  async updateOne(data: UpdateDishData) {
    await this.dishRepository.save(this.dishRepository.create(data));
  }

  // done
  async findAllByRestaurantId(restaurantId: string): Promise<ReadDishData[]> {
    return await this.dishRepository
      .createQueryBuilder('d')
      .select([
        'd.dishId AS "dishId"',
        'd.restaurantId AS "restaurantId"',
        'd.name AS name',
        'd.price AS price',
        'd.description AS description',
        'd.category AS category',
        'd.dishImgUrl AS "dishImgUrl"',
      ])
      .where('d.restaurantId = :restaurantId', { restaurantId })
      .getRawMany<ReadDishData>();
  }

  // done
  async findOneById(id: string): Promise<ReadDishData> {
    const row = await this.dishRepository
      .createQueryBuilder('d')
      .select([
        'd.dishId AS "dishId"',
        'd.restaurantId AS "restaurantId"',
        'd.name AS name',
        'd.price AS price',
        'd.description AS description',
        'd.category AS category',
        'd.dishImgUrl AS "dishImgUrl"',
      ])
      .where('d.dishId = :dishId', { dishId: id })
      .getRawOne<ReadDishData>();

    if (!row) throw new Error('Dish not found');
    return row;
  }

  async deleteOneById(id: string) {
    await this.dishRepository.delete({ dishId: id });
  }

  async findAllByIds(dishIds: string[]): Promise<ReadDishData[]> {
    return await this.dishRepository
      .createQueryBuilder('d')
      .select([
        'd.dishId AS "dishId"',
        'd.restaurantId AS "restaurantId"',
        'd.name AS name',
        'd.price AS price',
        'd.description AS description',
        'd.category AS category',
        'd.dishImgUrl AS "dishImgUrl"',
      ])
      .where('d.dishId IN (:...dishIds)', { dishIds })
      .getRawMany<ReadDishData>();
  }
}
