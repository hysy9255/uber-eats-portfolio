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

  async getDishesByIds(dishIds: string[]) {
    return await this.dishRepository
      .createQueryBuilder('dish')
      .where('dish.dishId IN (:...dishIds)', { dishIds })
      .getMany();
  }
}
