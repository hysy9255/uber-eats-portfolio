import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateRestaurantData } from '../types/restaurant/create-restaurant-data';
import { UpdateRestaurantData } from '../types/restaurant/update-restaurant-data';
import { UpdateRestaurantGeneralInfoDTO } from '../dto/restaurantGeneralInfo/request/update-restaurant-general-info.dto';
import { CreateRestaurantGeneralInfoDTO } from '../dto/restaurantGeneralInfo/request/create-restaurant-general-info.dto';

@Injectable()
export class RestaurantMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    ownerId: string,
    dto: CreateRestaurantGeneralInfoDTO,
  ): CreateRestaurantData {
    return new CreateRestaurantData({
      restaurantId: this.sharedService.generateId(),
      ownerId,
      ...dto,
    });
  }

  dtoToUpdateData(
    restaurantId: string,
    dto: UpdateRestaurantGeneralInfoDTO,
  ): UpdateRestaurantData {
    return new UpdateRestaurantData({ restaurantId, ...dto });
  }
}
