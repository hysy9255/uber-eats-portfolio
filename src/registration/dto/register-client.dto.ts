import { ApiProperty } from '@nestjs/swagger';
import { CreateDeliveryAddressDTO } from 'src/client/dto/create-delivery-address.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

export class RegisterClientDTO {
  @ApiProperty({ type: CreateUserDTO })
  user: CreateUserDTO;

  @ApiProperty({ type: CreateDeliveryAddressDTO })
  deliveryInfo: CreateDeliveryAddressDTO;
}
