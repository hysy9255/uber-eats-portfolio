import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateRestaurantData } from '../types/create-restaurant-data';
import { UpdateRestaurantData } from '../types/update-restaurant-data';
import { UpdateRestaurantGeneralInfoDTO } from '../dto/restaurantInfo/update-restaurant-info.request.dto';
import { RestaurantDTO } from '../dto/restaurantInfo/restaurant.dto';
import { ReadRestaurantData } from '../types/read-restaurant-data';
import { CreateRestaurantGeneralInfoDTO } from '../dto/restaurantInfo/create-restaurant-general-info.dto';

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

  readDataToDTO(data: ReadRestaurantData): RestaurantDTO {
    return new RestaurantDTO({
      ...data,
    });
  }
}
