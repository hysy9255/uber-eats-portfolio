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

@Controller('dishes')
export class DishController {
  constructor() {}

  @Post()
  createDish(@Body() createDishInput: CreateDishInput) {
    console.log(createDishInput);
  }

  @Get()
  getDishes() {}

  @Get('/:id')
  getDish(@Param('id') dishId: string) {
    console.log(dishId);
  }

  @Patch('/:id')
  updateDish(
    @Param('id') dishId: string,
    @Body() updateDishInput: UpdateDishInput,
  ) {
    console.log(updateDishInput);
  }

  @Delete('/:id')
  deleteDish(@Param('id') dishId: string) {
    console.log(dishId);
  }
}
