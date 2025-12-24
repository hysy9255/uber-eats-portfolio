import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  RestaurantService,
  RestaurantView,
  UpdateRestaurantInputV3,
} from '../service/restaurant.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserOutput, UserRole } from 'src/user/dto/user-output';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserService } from 'src/user/service/user.service';
import { DishService } from '../service/dish.service';

@ApiSecurity('jwt-token')
@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly userService: UserService,
    private readonly dishService: DishService,
  ) {}

  // @ApiOperation({ summary: 'Get my restaurant' })
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.Owner)
  // @Get('/my-restaurant')
  // getMyRestaurant(@Req() req: Request) {
  //   const { userId } = req['authUser'] as UserOutput;
  //   return this.restaurantService.getMyRestaurant(userId);
  // }

  @ApiOperation({ summary: 'Get restaurant info for owner dashboard' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/my-restaurantV2')
  async getMyRestaurantView(@Req() req: Request) {
    const { userId } = req['authUser'] as UserOutput;
    const ownerId = await this.userService.getOwnerId(userId);
    return this.restaurantService.getMyRestaurantView(ownerId);
  }

  // @ApiOperation({ summary: 'Create a restaurant' })
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.Owner)
  // @Post()
  // async createRestaurant(
  //   @Req() req: Request,
  //   @Body() createRestaurantInput: CreateRestaurantInput,
  // ) {
  //   const { userId } = req['authUser'] as UserOutput;
  //   await this.restaurantService.createRestaurant(
  //     userId,
  //     createRestaurantInput,
  //   );
  // }

  // @ApiOperation({ summary: 'Get a list of restaurants' })
  // @Get()
  // getRestaurants() {
  //   return this.restaurantService.getRestaurants();
  // }

  @ApiOperation({ summary: 'Get a list of restaurants V2' })
  @Get()
  getRestaurantsV2() {
    return this.restaurantService.getRestaurantsV2();
  }

  // @ApiOperation({ summary: 'Get a restaurant' })
  // @Get('/:restaurantId')
  // getRestaurant(@Param('restaurantId') restaurantId: string) {
  //   return this.restaurantService.getRestaurant(restaurantId);
  // }

  @ApiOperation({ summary: 'Get a restaurant' })
  @Get('/:id')
  getRestaurant(@Param('id') id: string): Promise<RestaurantView> {
    return this.restaurantService.getRestaurantView(id);
  }

  @Get('/v2/:id/view')
  getRestaurantView(@Param('id') id: string) {
    return this.restaurantService.getRestaurantViewV2(id);
  }

  @ApiOperation({ summary: 'Get restaurant name' })
  @Get('/v2/restaurantName/:id')
  async getRestaurantName(@Param('id') id: string): Promise<string> {
    const { dba } = await this.restaurantService.getRestaurantV2(id);
    return dba;
  }

  @ApiOperation({ summary: 'Update a restaurant' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/')
  async updateRestaurant(
    @Req() req: Request,
    @Body() updateRestaurantInput: UpdateRestaurantInputV3,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.restaurantService.updateRestaurantV2(
      userId,
      updateRestaurantInput,
    );
  }

  @ApiOperation({ summary: 'Delete a restaurant' })
  @UseGuards(AuthGuard)
  @Delete('/')
  async deleteRestaurant(@Req() req: Request) {
    const { userId } = req['authUser'] as UserOutput;
    const ownerId = await this.userService.getOwnerId(userId);
    await this.restaurantService.deleteRestaurantV2(ownerId);
  }
}
