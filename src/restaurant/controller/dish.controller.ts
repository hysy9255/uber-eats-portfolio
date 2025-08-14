import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateDishInput, UpdateDishInput } from '../dto/dish-input';
import { DishService } from '../service/dish.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserOutput } from 'src/user/dto/user-output';

@Controller('/restaurants/:restaurantId/dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createDish(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
    @Body() createDishInput: CreateDishInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.dishService.createDish(userId, restaurantId, createDishInput);
  }

  @Get()
  async getDishes(@Param('restaurantId') restaurantId: string) {
    return await this.dishService.getDishes(restaurantId);
  }

  @Get('/:dishId')
  async getDish(@Param('dishId') dishId: string) {
    await this.dishService.getDish(dishId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:dishId')
  async updateDish(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
    @Param('dishId') dishId: string,
    @Body() updateDishInput: UpdateDishInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.dishService.updateDish(
      userId,
      restaurantId,
      dishId,
      updateDishInput,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:dishId')
  async deleteDish(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
    @Param('dishId') dishId: string,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.dishService.deleteDish(userId, restaurantId, dishId);
  }
}
