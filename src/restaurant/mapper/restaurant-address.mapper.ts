import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateRestaurantAddressData } from '../types/restaurant-address/create-restaurant-address-data';
import { RestaurantAddressDTO } from '../dto/restaurantAddress/response/restaurant-address.dto';
import { UpdateRestaurantAddressData } from '../types/restaurant-address/update-restaurant-address-data';
import { ReadRestaurantAddressData } from '../types/restaurant-address/read-restaurant-address-data';
import { UpdateRestaurantAddressDTO } from '../dto/restaurantAddress/request/update-restaurant-address.dto';
import { CreateRestaurantAddressDTO } from '../dto/restaurantAddress/request/create-restaurant-address.dto';

@Injectable()
export class RestaurantAddressMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    restaurantId: string,
    dto: CreateRestaurantAddressDTO,
  ): CreateRestaurantAddressData {
    return new CreateRestaurantAddressData({
      restaurantAddressId: this.sharedService.generateId(),
      restaurantId,
      ...dto,
      unit: dto.unit ?? null,
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
