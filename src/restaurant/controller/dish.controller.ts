import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDishInput, UpdateDishInput } from '../dto/dish-input';
import { DishService } from '../service/dish.service';

@Controller('/restaurants/:restaurantId/dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  createDish(
    @Param('restaurantId') restaurantId: string,
    @Body() createDishInput: CreateDishInput,
  ) {
    this.dishService.createDish(restaurantId, createDishInput);
  }

  @Get()
  getDishes(@Param('restaurantId') restaurantId: string) {
    this.dishService.getDishes(restaurantId);
  }

  @Get('/:dishId')
  getDish(@Param('dishId') dishId: string) {
    this.dishService.getDish(dishId);
  }

  @Patch('/:dishId')
  updateDish(
    @Param('dishId') dishId: string,
    @Body() updateDishInput: UpdateDishInput,
  ) {
    this.dishService.updateDish(dishId, updateDishInput);
  }

  @Delete('/:dishId')
  deleteDish(@Param('dishId') dishId: string) {
    this.dishService.deleteDish(dishId);
  }
}
