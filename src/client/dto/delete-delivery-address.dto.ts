import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteDeliveryAddressDTO {
  @ApiProperty({
    example: 'xxxxx',
    description: 'DeliveryAddressId',
  })
  @IsString()
  deliveryAddressId: string;
}
