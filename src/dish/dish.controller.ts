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
import { AuthGuard } from 'src/auth/auth.guard';
import { OwnerUser } from 'src/auth/types/auth-user';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { DishService } from './service/dish.service';
import { DishPageDTO } from 'src/dish/dto/response/dish-page.dto';
import { CreateDishDTO } from './dto/request/create-dish.dto';
import { UserRole } from 'src/constants/userRole';
import { DishDTO } from './dto/response/dish.dto';
import { AUTH_USER } from 'src/constants/variables';
import { UpdateDishDTO } from './dto/request/update-dish.dto';

@ApiSecurity('jwt-token')
@Controller()
export class DishController {
  constructor(private readonly service: DishService) {}

  @ApiOperation({ summary: 'Get dishes' })
  @UseGuards(AuthGuard)
  @Get('/restaurants/:restaurantId/dishes')
  async getDishes(
    @Param('restaurantId') restaurantId: string,
  ): Promise<DishDTO[]> {
    return await this.service.getDishes(restaurantId);
  }

  @ApiOperation({ summary: 'Get dish page view' })
  @UseGuards(AuthGuard)
  @Get('/dishes/:dishId/page')
  async getDishPage(@Param('dishId') dishId: string): Promise<DishPageDTO> {
    return await this.service.getDishPage(dishId);
  }

  @ApiOperation({ summary: 'Create Dish' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Post('dishes')
  async createDish(@Req() req: Request, @Body() dto: CreateDishDTO) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.service.createDish(ownerId, dto);
  }

  @ApiOperation({ summary: 'Update dish' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/dishes/:dishId')
  async updateDish(
    @Req() req: Request,
    @Param('dishId') dishId: string,
    @Body() dto: UpdateDishDTO,
  ) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.service.updateDish(ownerId, dishId, dto);
  }

  @ApiOperation({ summary: 'Delete dish' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Delete('/dishes/:dishId')
  async deleteDish(@Req() req: Request, @Param('dishId') dishId: string) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.service.deleteDish(ownerId, dishId);
  }
}
