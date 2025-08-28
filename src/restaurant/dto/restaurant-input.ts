// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRestaurantInput {
  @ApiProperty({ example: 'chinese tuxedo', description: 'restaurant name' })
  name: string;
  @ApiProperty({
    example: 'nyc, 5 Doyers St',
    description: 'restaurant address',
  })
  address: string;
}

export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {}
