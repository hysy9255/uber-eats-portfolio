import { ApiProperty } from '@nestjs/swagger';
import { CreateOperatingHoursDTO } from '../operatingHours/request/create-operating-hours.dto';
import { CreateRestaurantAddressDTO } from '../restaurantAddress/request/create-restaurant-address.dto';
import { CreateRestaurantGeneralInfoDTO } from '../restaurantGeneralInfo/request/create-restaurant-general-info.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRestaurantDTO {
  @ApiProperty({ type: CreateRestaurantGeneralInfoDTO })
  @ValidateNested()
  @Type(() => CreateRestaurantGeneralInfoDTO)
  generalInfo: CreateRestaurantGeneralInfoDTO;

  @ApiProperty({ type: CreateRestaurantAddressDTO })
  @ValidateNested()
  @Type(() => CreateRestaurantAddressDTO)
  address: CreateRestaurantAddressDTO;

  @ApiProperty({ type: CreateOperatingHoursDTO })
  @ValidateNested()
  @Type(() => CreateOperatingHoursDTO)
  operatingHours: CreateOperatingHoursDTO;
}
