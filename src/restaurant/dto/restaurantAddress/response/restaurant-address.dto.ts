import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RestaurantAddressDTO {
  @ApiProperty({
    example: '123 Main St',
    description: 'Restaurant street address',
  })
  readonly streetAddress: string;

  @ApiPropertyOptional({
    example: 'Unit 101',
    description: 'Apartment, suite, or unit number',
    nullable: true,
  })
  readonly unit: string | null;

  @ApiProperty({
    example: 'CA',
    description: 'State',
  })
  readonly state: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'City',
  })
  readonly city: string;

  @ApiProperty({
    example: '90001',
    description: 'Zip code',
  })
  readonly zip: string;

  constructor(init: {
    streetAddress: string;
    unit: string | null;
    state: string;
    city: string;
    zip: string;
  }) {
    this.streetAddress = init.streetAddress;
    this.unit = init.unit;
    this.state = init.state;
    this.city = init.city;
    this.zip = init.zip;
  }
}
