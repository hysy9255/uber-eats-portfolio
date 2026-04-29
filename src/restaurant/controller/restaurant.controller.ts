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
import { GetRestaurantPageViewDTO } from '../dto/get-restaurant-page-view.dto';
import { UpdateRestaurantDTO } from '../dto/update-restaurant.dto';
import { UserRole } from 'src/constants/userRole';
import { GetRestaurantNameAndLogoDTO } from '../dto/get-restaurant-name.dto';
import { GetRestaurantsPageViewDTO } from '../dto/get-restaurants-page-view.dto';
import { BusinessInfoDTO } from '../dto/get-my-restaurant-for-owner-dashboard.dto';
import { OwnerUser } from 'src/user/types/auth-user';
import { AUTH_USER } from 'src/constants/variables';
import { RestaurantCommandService } from '../service/restaurant.command.service';
import { RestaurantQueryService } from '../service/restaurant.query.service';

@ApiSecurity('jwt-token')
@Controller()
export class RestaurantController {
  constructor(
    private readonly command: RestaurantCommandService,
    private readonly query: RestaurantQueryService,
  ) {}

  @ApiOperation({ summary: 'Get Restaurants Page View' })
  @Get('/restaurants')
  getRestaurantsPageView(): Promise<GetRestaurantsPageViewDTO> {
    return this.query.getRestaurantsPage();
  }

  @ApiOperation({ summary: 'Get Restaurant Page View' })
  @Get('/restaurants/:id/view')
  getRestaurantPageView(
    @Param('id') restaurantId: string,
  ): Promise<GetRestaurantPageViewDTO> {
    return this.query.getRestaurantPage(restaurantId);
  }

  @ApiOperation({ summary: 'Restaurant Information for owner dashboard' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/restaurants/my-restaurant')
  async getMyRestaurantForOwnerDashboard(
    @Req() req: Request,
  ): Promise<BusinessInfoDTO> {
    const { ownerId } = req[AUTH_USER] as OwnerUser;
    return await this.query.getMyBusinessInfo(ownerId);
  }

  @ApiOperation({ summary: 'Get Restaurant Name' })
  @Get('/restaurants/restaurantName/:id')
  async getRestaurantNameAndLogo(
    @Param('id') id: string,
  ): Promise<GetRestaurantNameAndLogoDTO> {
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
