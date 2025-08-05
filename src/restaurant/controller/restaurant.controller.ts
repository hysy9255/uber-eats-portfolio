import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../dto/restaurant-input';
import { RestaurantService } from '../service/restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(
    @Req() req: Request,
    @Body() createRestaurantInput: CreateRestaurantInput,
  ) {
    await this.restaurantService.createRestaurant(
      req['userId'] as string,
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

  @Patch('/:id')
  async updateRestaurant(
    @Param('id') restaurantId: string,
    @Body() updateRestaurantInput: UpdateRestaurantInput,
  ) {
    await this.restaurantService.updateRestaurant(
      restaurantId,
      updateRestaurantInput,
    );
  }

  @Delete('/:id')
  async deleteRestaurant(@Param('id') restaurantId: string) {
    await this.restaurantService.deleteResetaurant(restaurantId);
  }
}
