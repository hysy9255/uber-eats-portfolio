import { Injectable } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { DishMapper } from './dish.mapper';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishDTO } from './dto/dish.dto';
import { ReadDishData } from './types/read-dish-data';

@Injectable()
export class DishInternalService {
  constructor(
    private readonly dishRepo: DishRepository,
    private readonly dishMapper: DishMapper,
  ) {}

  // done
  async getAllByRestaurantId(restaurantId: string): Promise<DishDTO[]> {
    const rows = await this.dishRepo.findAllByRestaurantId(restaurantId);
    return rows.map((row) => this.dishMapper.readDataToDTO(row));
  }

  // done
  async createMany(restaurantId: string, dto: CreateDishDTO[]) {
    const createDishesData = this.dishMapper.dtoToCreateDishesData(
      restaurantId,
      dto,
    );
    await this.dishRepo.saveMultiple(createDishesData);
  }

  // done
  async getManyByIds(dishIds: string[]): Promise<ReadDishData[]> {
    return await this.dishRepo.findAllByIds(dishIds);
  }

  // done
  async getByIds(dishIds: string[]): Promise<ReadDishData[]> {
    return await this.dishRepo.findAllByIds(dishIds);
  }
}
