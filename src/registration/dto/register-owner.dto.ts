import { ApiProperty } from '@nestjs/swagger';

import { CreateRestaurantDTO } from 'src/restaurant/dto/create-restaurant.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

export class RegisterOwnerDTO {
  @ApiProperty({ type: CreateUserDTO })
  user: CreateUserDTO;

  @ApiProperty({ type: CreateRestaurantDTO })
  restaurant: CreateRestaurantDTO;
}
