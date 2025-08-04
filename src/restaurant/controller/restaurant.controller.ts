import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../dto/restaurant-input';

@Controller('restaurants')
export class RestaurantController {
  constructor() {}

  @Post()
  createRestaurant(@Body() createRestaurantInput: CreateRestaurantInput) {
    console.log(createRestaurantInput);
  }

  @Get()
  getRestaurants() {}

  @Get('/:id')
  getRestaurant(@Param('id') restaurantId: string) {
    console.log(restaurantId);
  }

  @Patch('/:id')
  updateRestaurant(
    @Param('id') restaurantId: string,
    @Body() updateRestaurantInput: UpdateRestaurantInput,
  ) {
    console.group(updateRestaurantInput);
  }

  @Delete('/:id')
  deleteRestaurant(@Param('id') restaurantId: string) {
    console.log(restaurantId);
  }
}
