import { Injectable } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishMapper } from './dish.mapper';

@Injectable()
export class DishRegisterService {
  constructor(
    private readonly dishRepo: DishRepository,
    private readonly dishMapper: DishMapper,
  ) {}

  async register(restaurantId: string, dto: CreateDishDTO[]) {
    const createDishesData = this.dishMapper.dtoToCreateDishesData(
      restaurantId,
      dto,
    );
    await this.dishRepo.save(createDishesData);
  }
}
