import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMenuInput,
  DishEntityV2,
  UpdateMenuInput,
} from '../orm-entities/dish.orm.entity';

@Injectable()
export class DishRepositoryV2 {
  constructor(
    @InjectRepository(DishEntityV2)
    private readonly dishRepositoryV2: Repository<DishEntityV2>,
  ) {}

  bulkSaveDishes(createBulkMenusInput: CreateMenuInput[]) {
    return this.dishRepositoryV2.save(
      this.dishRepositoryV2.create(createBulkMenusInput),
    );
  }

  saveDishV2(createMenuInput: CreateMenuInput) {
    return this.dishRepositoryV2.save(
      this.dishRepositoryV2.create(createMenuInput),
    );
  }

  updateOneById(updateMenuInput: UpdateMenuInput) {
    return this.dishRepositoryV2.save(
      this.dishRepositoryV2.create(updateMenuInput),
    );
  }

  findManyByRestaurantId(restaurantId: string): Promise<DishEntityV2[]> {
    return this.dishRepositoryV2.query(
      'SELECT * FROM "dishesV2" WHERE "restaurantId" = $1',
      [restaurantId],
    );
  }

  async findOneById(id: string) {
    return await this.dishRepositoryV2
      .createQueryBuilder('dish')
      .where('dish.dishId = :dishId', { dishId: id })
      .getOne();
  }

  async deleteOneById(id: string) {
    await this.dishRepositoryV2.delete({ dishId: id });
  }
}
