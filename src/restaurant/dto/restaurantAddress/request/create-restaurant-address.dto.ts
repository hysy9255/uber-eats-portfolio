import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRestaurantAddressDTO {
  @ApiProperty({
    example: '123 Main St',
    description: 'Restaurant street address',
  })
  @IsString()
  readonly streetAddress: string;

  @ApiPropertyOptional({
    example: 'Unit 101',
    description: 'Apartment, suite, or unit number',
  })
  @IsOptional()
  @IsString()
  readonly unit?: string;

  @ApiProperty({
    example: 'CA',
    description: 'State',
  })
  @IsString()
  readonly state: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'City',
  })
  @IsString()
  readonly city: string;

  @ApiProperty({
    example: '90001',
    description: 'Zip code',
  })
  @IsString()
  readonly zip: string;
}
