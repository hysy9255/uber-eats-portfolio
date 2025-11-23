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
import { UpdateDishInput } from '../dto/dish-input';
import { DishService } from '../service/dish.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserOutput, UserRole } from 'src/user/dto/user-output';
import { ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { CreateMenuInput } from 'src/restaurant/dto/dish-input';

@ApiSecurity('jwt-token')
@ApiParam({
  name: 'restaurantId',
  required: true,
  type: String,
})
@Controller()
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @ApiOperation({ summary: 'Create Dish v2' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Post('dishes/v2')
  async createDishV2(
    @Req() req: Request,
    @Body() createMenuInput: CreateMenuInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    const menuItems = createMenuInput.items;
    await this.dishService.createMenus(userId, menuItems);
  }

  @ApiOperation({ summary: 'Get dishes' })
  @Get('/restaurants/:restaurantId/dishes')
  async getDishes(@Param('restaurantId') restaurantId: string) {
    // return await this.dishService.getDishes(restaurantId);
    return await this.dishService.getDishesV2(restaurantId);
  }

  @ApiOperation({ summary: 'Get dish' })
  @Get('/restaurants/:restaurantId/dishes/:dishId')
  async getDish(@Param('dishId') id: string) {
    return await this.dishService.getDishV2(id);
  }

  @ApiOperation({ summary: 'Update dish' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/dishes/:dishId')
  async updateDish(
    @Req() req: Request,
    @Param('dishId') dishId: string,
    @Body() updateDishInput: UpdateDishInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.dishService.updateDishV2(userId, dishId, updateDishInput);
  }

  @ApiOperation({ summary: 'Delete dish V2' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Delete('/dishes/:dishId')
  async deleteDishV2(@Req() req: Request, @Param('dishId') dishId: string) {
    const { userId } = req['authUser'] as UserOutput;
    await this.dishService.deleteDishV2(userId, dishId);
  }
}
