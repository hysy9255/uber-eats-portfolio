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
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('jwt-token')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiOperation({ summary: 'Create a restaurant' })
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

  @ApiOperation({ summary: 'Get a list of restaurants' })
  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @ApiOperation({ summary: 'Get a restaurant' })
  @Get('/:restaurantId')
  getRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.restaurantService.getRestaurant(restaurantId);
  }

  @ApiOperation({ summary: 'Update a restaurant' })
  @UseGuards(AuthGuard)
  @Patch('/:restaurantId')
  async updateRestaurant(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantInput: UpdateRestaurantInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.restaurantService.updateRestaurant(
      userId,
      restaurantId,
      updateRestaurantInput,
    );
  }

  @ApiOperation({ summary: 'Delete a restaurant' })
  @UseGuards(AuthGuard)
  @Delete('/:restaurantId')
  async deleteRestaurant(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.restaurantService.deleteResetaurant(userId, restaurantId);
  }
}
