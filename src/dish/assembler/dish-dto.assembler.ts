import { Injectable } from '@nestjs/common';
import { GetDishPageDTO } from '../dto/get-dish-page.dto';
import { ReadDishData } from '../types/read-dish-data';
import { ReadRestaurantData } from 'src/restaurant/types/read-restaurant-data';
import { DishMapper } from '../dish.mapper';

@Injectable()
export class DishDTOAssembler {
  constructor(private readonly dishMapper: DishMapper) {}

  buildDishPage(
    dish: ReadDishData,
    dishes: ReadDishData[],
    restaurant: ReadRestaurantData,
  ): GetDishPageDTO {
    const { dba, logo } = restaurant;
    const response = new GetDishPageDTO();
    response.restaurantName = dba;
    response.restaurantLogo = logo;
    response.dish = this.dishMapper.readDataToDTO(dish);
    response.dishes = dishes.map((dish) => this.dishMapper.readDataToDTO(dish));
    return response;
  }
}
