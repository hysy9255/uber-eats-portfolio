import { ApiProperty } from '@nestjs/swagger';
import { CreateDishDTO } from 'src/dish/dto/create-dish.dto';
import { CreateRestaurantSummaryDTO } from './create-restaurant-summary.dto';

export class CreateRestaurantDTO {
  restaurantSummary: CreateRestaurantSummaryDTO;

  @ApiProperty({
    type: [CreateDishDTO],
    description: 'Dish informations to create',
  })
  dishes?: CreateDishDTO[];
}
