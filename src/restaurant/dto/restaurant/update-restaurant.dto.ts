import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateRestaurantGeneralInfoDTO } from '../restaurantGeneralInfo/request/update-restaurant-general-info.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateRestaurantAddressData } from 'src/restaurant/types/restaurant-address/update-restaurant-address-data';
import { UpdateOperatingHoursDTO } from '../operatingHours/request/update-operating-hours.dto';

export class UpdateRestaurantDTO {
  @ApiPropertyOptional({ type: UpdateRestaurantGeneralInfoDTO })
  @ValidateNested()
  @Type(() => UpdateRestaurantGeneralInfoDTO)
  generalInfo?: UpdateRestaurantGeneralInfoDTO;

  @ApiPropertyOptional({ type: UpdateRestaurantAddressData })
  @ValidateNested()
  @Type(() => UpdateRestaurantAddressData)
  address?: UpdateRestaurantAddressData;

  @ApiPropertyOptional({ type: UpdateOperatingHoursDTO })
  @ValidateNested()
  @Type(() => UpdateOperatingHoursDTO)
  operatingHours?: UpdateOperatingHoursDTO;
}
