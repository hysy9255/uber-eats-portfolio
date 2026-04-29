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
import { OwnerUser } from 'src/user/types/auth-user';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { DishExternalService } from './dish.external.service';
import { GetDishPageDTO } from 'src/dish/dto/get-dish-page.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UserRole } from 'src/constants/userRole';
import { DishDTO } from './dto/dish.dto';
import { AUTH_USER } from 'src/constants/variables';

@ApiSecurity('jwt-token')
@Controller()
export class DishController {
  constructor(private readonly dishExternalService: DishExternalService) {}

  // done
  @ApiOperation({ summary: 'Get dishes' })
  @Get('/restaurants/:restaurantId/dishes')
  async getDishes(
    @Param('restaurantId') restaurantId: string,
  ): Promise<DishDTO[]> {
    return await this.dishExternalService.getDishes(restaurantId);
  }

  // done
  @ApiOperation({ summary: 'Get dish page view' })
  @Get('/dishes/:dishId/page')
  async getDishPage(@Param('dishId') dishId: string): Promise<GetDishPageDTO> {
    return await this.dishExternalService.getDishPage(dishId);
  }

  // done
  @ApiOperation({ summary: 'Create Dish' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Post('dishes')
  async createDish(@Req() req: Request, @Body() dto: CreateDishDTO) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.dishExternalService.createDish(ownerId, dto);
  }

  // done
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
    await this.dishExternalService.updateDish(ownerId, dishId, dto);
  }

  // done
  @ApiOperation({ summary: 'Delete dish' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Delete('/dishes/:dishId')
  async deleteDish(@Req() req: Request, @Param('dishId') dishId: string) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.dishExternalService.deleteDish(ownerId, dishId);
  }
}
