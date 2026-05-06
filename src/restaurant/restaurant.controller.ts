import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/userRole';
import { RestaurantNameAndLogoDTO } from './dto/restaurant-name.dto';
import { RestaurantViewDTO } from './dto/restaurants-view.dto';
import { OwnerUser } from 'src/auth/types/auth-user';
import { AUTH_USER } from 'src/constants/variables';
import { RestaurantCommandService } from './service/restaurant.command.service';
import { RestaurantQueryService } from './service/restaurant.query.service';
import { UpdateRestaurantDTO } from './dto/restaurant/update-restaurant.dto';

@ApiSecurity('jwt-token')
@Controller()
export class RestaurantController {
  constructor(
    private readonly command: RestaurantCommandService,
    private readonly query: RestaurantQueryService,
  ) {}

  @ApiOperation({ summary: 'Get Restaurants Page View' })
  @Get('/restaurants')
  getRestaurantsPageView(): Promise<RestaurantViewDTO[]> {
    return this.query.getRestaurantViews();
  }

  @ApiOperation({ summary: 'Get Restaurant Page View' })
  @Get('/restaurants/:id/view')
  getRestaurantPageView(
    @Param('id') restaurantId: string,
  ): Promise<RestaurantViewDTO> {
    return this.query.getRestaurantViewById(restaurantId);
  }

  @ApiOperation({ summary: 'Restaurant Information for owner dashboard' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/restaurants/my-restaurant')
  async getMyRestaurantForOwnerDashboard(
    @Req() req: Request,
  ): Promise<RestaurantViewDTO> {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    return await this.query.getRestaurantViewByOwner(ownerId);
  }

  @ApiOperation({ summary: 'Get Restaurant Name' })
  @Get('/restaurants/restaurantName/:id')
  async getRestaurantNameAndLogo(
    @Param('id') id: string,
  ): Promise<RestaurantNameAndLogoDTO> {
    return await this.query.getRestaurantNameAndLogo(id);
  }

  @ApiOperation({ summary: 'Update Restaurant' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/restaurants')
  async updateRestaurant(
    @Req() req: Request,
    @Body() body: UpdateRestaurantDTO,
  ) {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    await this.command.updateRestaurant(ownerId, body);
  }
}
