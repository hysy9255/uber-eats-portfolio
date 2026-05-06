import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { AddressAliasType } from 'src/constants/addressAliasType';

export class CreateDeliveryAddressDTO {
  @ApiProperty({
    example: '123 Main St',
    description: 'Street address',
  })
  @IsString()
  readonly streetAddress: string;

  @ApiProperty({
    example: 'Apt 101',
    description: 'Apartment, suite, or unit number',
  })
  @IsString()
  readonly apt: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'City',
  })
  @IsString()
  readonly city: string;

  @ApiProperty({
    example: 'CA',
    description: 'State',
  })
  @IsString()
  readonly state: string;

  @ApiProperty({
    example: '90001',
    description: 'Zip code',
  })
  @IsString()
  readonly zip: string;

  @ApiProperty({
    example: true,
    description: 'Whether this address is the default delivery address',
  })
  @IsBoolean()
  readonly isDefault: boolean;

  @ApiProperty({
    enum: AddressAliasType,
    example: AddressAliasType.home,
    description: 'Address alias type',
  })
  @IsEnum(AddressAliasType)
  readonly alias: AddressAliasType;

  @ApiPropertyOptional({
    example: 'Parents house',
    description: 'Custom alias when alias type is custom',
  })
  @IsOptional()
  @IsString()
  readonly customAlias?: string;
}
