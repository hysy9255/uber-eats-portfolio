import { ApiProperty } from '@nestjs/swagger';
import { UpdateRestaurantGeneralInfoDTO } from './restaurantInfo/update-restaurant-info.request.dto';
import { UpdateOperatingHoursDTO } from './operatingHours/update-operating-hours.request.dto';
import { UpdateRestaurantAddressDTO } from './restaurantAddress/update-restaurant-address.dto';

export class UpdateRestaurantDTO {
  @ApiProperty({ type: UpdateRestaurantGeneralInfoDTO })
  generalInfo?: UpdateRestaurantGeneralInfoDTO;

  @ApiProperty({ type: UpdateRestaurantAddressDTO })
  address?: UpdateRestaurantAddressDTO;

  @ApiProperty({ type: UpdateOperatingHoursDTO })
  operatingHours?: UpdateOperatingHoursDTO;
}
