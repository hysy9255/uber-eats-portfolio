import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AddressAliasType } from 'src/constants/addressAliasType';

export class UpdateDeliveryAddressDTO {
  @ApiProperty({
    example: 'xxxxx',
    description: 'DeliveryAddressId',
  })
  @IsString()
  deliveryAddressId: string;

  @ApiProperty({
    example: 'xxxxx',
    description: 'street address',
  })
  @IsString()
  streetAddress: string;

  @ApiProperty({
    example: 'xxxxx',
    description: 'apt',
  })
  @IsString()
  apt: string;

  @ApiProperty({
    example: 'xxxxx',
    description: 'city',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'xxxxx',
    description: 'state',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: 'xxxxx',
    description: 'zip',
  })
  @IsString()
  zip: string;

  @ApiProperty({
    enum: AddressAliasType,
    enumName: 'AddressAliasType',
    example: AddressAliasType.home,
    description: 'alias',
  })
  @IsEnum(AddressAliasType)
  alias: AddressAliasType;

  @ApiPropertyOptional({
    example: 'xxxxx',
    description: 'street address',
  })
  @IsOptional()
  @IsString()
  customAlias?: string;
}
