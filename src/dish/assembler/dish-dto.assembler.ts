import { Injectable } from '@nestjs/common';
import { DishPageDTO } from '../dto/response/dish-page.dto';
import { ReadDishData } from '../types/read-dish-data';
import { DishMapper } from '../mapper/dish.mapper';

@Injectable()
export class DishDTOAssembler {
  constructor(private readonly dishMapper: DishMapper) {}

  buildDishPage(
    dish: ReadDishData,
    dishes: ReadDishData[],
    restaurantNameAndLogo: { dba: string; logo: string },
  ): DishPageDTO {
    const { dba, logo } = restaurantNameAndLogo;
    const response = new DishPageDTO();
    response.restaurantName = dba;
    response.restaurantLogo = logo;
    response.dish = this.dishMapper.readDataToDTO(dish);
    response.dishes = dishes.map((dish) => this.dishMapper.readDataToDTO(dish));
    return response;
  }
}
