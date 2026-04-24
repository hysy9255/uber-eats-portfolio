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
import { RestaurantExternalService } from '../service/restaurant.external.service';
import { UpdateRestaurantDTO } from '../dto/update-restaurant.dto';
import { UserRole } from 'src/constants/userRole';
import { GetRestaurantNameAndLogoDTO } from '../dto/get-restaurant-name.dto';
import { GetRestaurantsPageViewDTO } from '../dto/get-restaurants-page-view.dto';
import { GetMyRestaurantForOwnerDashboardDTO } from '../dto/get-my-restaurant-for-owner-dashboard.dto';
import { AuthUser } from 'src/user/types/auth-user';

@ApiSecurity('jwt-token')
@Controller()
export class RestaurantController {
  constructor(
    private readonly restaurantExternalService: RestaurantExternalService,
  ) {}

  //done
  @ApiOperation({ summary: 'Get Restaurants Page View' })
  @Get('/restaurants')
  getRestaurantsPageView(): Promise<GetRestaurantsPageViewDTO> {
    return this.restaurantExternalService.getRestaurantsPageView();
  }
  // done
  @ApiOperation({ summary: 'Get Restaurant Page View' })
  @Get('/restaurants/:id/view')
  getRestaurantPageView(
    @Param('id') restaurantId: string,
  ): Promise<GetRestaurantPageViewDTO> {
    return this.restaurantExternalService.getRestaurantPageViewByRestaurantId(
      restaurantId,
    );
  }

  // done
  @ApiOperation({
    summary: 'Get My Restaurant Information For Owner Dashboard',
  })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Get('/restaurants/my-restaurant')
  async getMyRestaurantForOwnerDashboard(
    @Req() req: Request,
  ): Promise<GetMyRestaurantForOwnerDashboardDTO> {
    const { userId } = req['authUser'] as AuthUser;
    return await this.restaurantExternalService.getOwnerRestaurantByUserId(
      userId,
    );
  }

  // done
  @ApiOperation({ summary: 'Get Restaurant Name' })
  @Get('/restaurants/restaurantName/:id')
  async getRestaurantNameAndLogo(
    @Param('id') id: string,
  ): Promise<GetRestaurantNameAndLogoDTO> {
    return await this.restaurantExternalService.getRestaurantNameAndLogo(id);
  }

  // done
  @ApiOperation({ summary: 'Update Restaurant' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner)
  @Patch('/restaurants')
  async updateRestaurant(
    @Req() req: Request,
    @Body() body: UpdateRestaurantDTO,
  ) {
    const { userId } = req['authUser'] as AuthUser;
    await this.restaurantExternalService.updateRestaurant(userId, body);
  }
}
