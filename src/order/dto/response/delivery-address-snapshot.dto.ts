import { ApiProperty } from '@nestjs/swagger';

export class DeliveryAddressSnapshotDTO {
  @ApiProperty({
    example: '123 Main St',
    description: 'Delivery street address at order time',
  })
  streetAddress: string;

  @ApiProperty({
    example: 'Apt 101',
    description: 'Apartment, suite, or unit number at order time',
  })
  apt: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'Delivery city at order time',
  })
  city: string;

  @ApiProperty({
    example: 'CA',
    description: 'Delivery state at order time',
  })
  state: string;

  @ApiProperty({
    example: '90001',
    description: 'Delivery zip code at order time',
  })
  zip: string;

  constructor(init: {
    streetAddress: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  }) {
    this.streetAddress = init.streetAddress;
    this.apt = init.apt;
    this.city = init.city;
    this.state = init.state;
    this.zip = init.zip;
  }
}
