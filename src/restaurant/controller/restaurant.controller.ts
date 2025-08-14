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
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../dto/restaurant-input';
import { RestaurantService } from '../service/restaurant.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserOutput } from 'src/user/dto/user-output';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createRestaurant(
    @Req() req: Request,
    @Body() createRestaurantInput: CreateRestaurantInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.restaurantService.createRestaurant(
      userId,
      createRestaurantInput,
    );
  }

  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Get('/:id')
  getRestaurant(@Param('id') restaurantId: string) {
    return this.restaurantService.getRestaurant(restaurantId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateRestaurant(
    @Req() req: Request,
    @Param('id') restaurantId: string,
    @Body() updateRestaurantInput: UpdateRestaurantInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.restaurantService.updateRestaurant(
      userId,
      restaurantId,
      updateRestaurantInput,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteRestaurant(
    @Req() req: Request,
    @Param('id') restaurantId: string,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.restaurantService.deleteResetaurant(userId, restaurantId);
  }
}
