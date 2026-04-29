import { Injectable } from '@nestjs/common';
import { ReadRestaurantData } from '../types/read-restaurant-data';
import { ReadOperatingHoursData } from '../types/read-operating-hours-data';
import { ReadRestaurantAddressData } from '../types/read-restaurant-address-data';
import { BusinessInfoDTO } from '../dto/get-my-restaurant-for-owner-dashboard.dto';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { OperatingHoursMapper } from '../mapper/operating-hours.mapper';
import { RestaurantAddressMapper } from '../mapper/restaurant-address.mapper';

@Injectable()
export class BusinessInfoDTOAssembler {
  constructor(
    private readonly restaurantMapper: RestaurantMapper,
    private readonly hoursMapper: OperatingHoursMapper,
    private readonly addressMapper: RestaurantAddressMapper,
  ) {}

  build(
    restaurant: ReadRestaurantData,
    hours: ReadOperatingHoursData[],
    address: ReadRestaurantAddressData,
  ): BusinessInfoDTO {
    const response = new BusinessInfoDTO();
    response.restaurantSummary = {
      generalInfo: this.restaurantMapper.readDataToDTO(restaurant),
      operatingHours: this.hoursMapper.readDataToDTO(hours),
      address: this.addressMapper.readDataToDTO(address),
    };
    return response;
  }
}
