import { ApiProperty } from '@nestjs/swagger';
import { CreateDishDTO } from 'src/dish/dto/request/create-dish.dto';
import { CreateRestaurantDTO } from './restaurant/create-restaurant.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterRestaurantDTO {
  @ApiProperty({
    type: [CreateRestaurantDTO],
    description: 'Restaurant information to create',
  })
  @ValidateNested()
  @Type(() => CreateRestaurantDTO)
  restaurant: CreateRestaurantDTO;

  @ApiProperty({
    type: [CreateDishDTO],
    description: 'Dish informations to create',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDishDTO)
  dishes?: CreateDishDTO[];
}
