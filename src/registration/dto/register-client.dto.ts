import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateDeliveryAddressDTO } from 'src/client/dto/create-delivery-address.dto';
import { CreateUserDTO } from 'src/user/dto/request/create-user.dto';

export class RegisterClientDTO {
  @ApiProperty({ type: CreateUserDTO })
  @ValidateNested()
  @Type(() => CreateUserDTO)
  user: CreateUserDTO;

  @ApiProperty({ type: CreateDeliveryAddressDTO })
  @ValidateNested()
  @Type(() => CreateDeliveryAddressDTO)
  deliveryInfo: CreateDeliveryAddressDTO;
}
