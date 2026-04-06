import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateRestaurantAddressData } from '../types/create-restaurant-address-data';
import { RestaurantAddressDTO } from '../dto/restaurantAddress/restaurant-address.dto';
import { UpdateRestaurantAddressData } from '../types/update-restaurant-address-data';
import { ReadRestaurantAddressData } from '../types/read-restaurant-address-data';
import { UpdateRestaurantAddressDTO } from '../dto/restaurantAddress/update-restaurant-address.dto';

@Injectable()
export class RestaurantAddressMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    restaurantId: string,
    dto: RestaurantAddressDTO,
  ): CreateRestaurantAddressData {
    return new CreateRestaurantAddressData({
      restaurantAddressId: this.sharedService.generateId(),
      restaurantId,
      ...dto,
    });
  }

  dtoToUpdateData(
    restaurantId: string,
    restaurantAddressId: string,
    dto: UpdateRestaurantAddressDTO,
  ): UpdateRestaurantAddressData {
    return new UpdateRestaurantAddressData({
      restaurantId,
      restaurantAddressId,
      ...dto,
    });
  }

  readDataToDTO(data: ReadRestaurantAddressData): RestaurantAddressDTO {
    return new RestaurantAddressDTO({
      ...data,
    });
  }
}
