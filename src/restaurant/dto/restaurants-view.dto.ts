import { ApiProperty } from '@nestjs/swagger';
import { OperatingHoursDTO } from './operatingHours/response/operating-hours.dto';
import { RestaurantAddressDTO } from './restaurantAddress/response/restaurant-address.dto';
import { RestaurantGeneralInfoDTO } from './restaurantGeneralInfo/response/restaurant-general-info.dto';

export class RestaurantViewDTO {
  @ApiProperty({ type: RestaurantGeneralInfoDTO })
  readonly generalInfo: RestaurantGeneralInfoDTO;

  @ApiProperty({ type: RestaurantAddressDTO })
  readonly address: RestaurantAddressDTO;

  @ApiProperty({ type: OperatingHoursDTO })
  readonly operatingHours: OperatingHoursDTO;

  constructor(init: {
    generalInfo: RestaurantGeneralInfoDTO;
    address: RestaurantAddressDTO;
    operatingHours: OperatingHoursDTO;
  }) {
    this.generalInfo = init.generalInfo;
    this.address = init.address;
    this.operatingHours = init.operatingHours;
  }
}
