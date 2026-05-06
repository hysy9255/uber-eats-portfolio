import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { RegisterRestaurantDTO } from 'src/restaurant/dto/register-restaurant.dto';
import { CreateUserDTO } from 'src/user/dto/request/create-user.dto';

export class RegisterOwnerDTO {
  @ApiProperty({ type: CreateUserDTO })
  @ValidateNested()
  @Type(() => CreateUserDTO)
  user: CreateUserDTO;

  @ApiProperty({ type: RegisterRestaurantDTO })
  @ValidateNested()
  @Type(() => RegisterRestaurantDTO)
  restaurant: RegisterRestaurantDTO;
}
