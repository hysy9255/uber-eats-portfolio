import { ApiProperty } from '@nestjs/swagger';

export class RestaurantNameAndLogoDTO {
  @ApiProperty({
    example: 'Shawn Seafood',
    description: 'Restaurant display name',
  })
  readonly restaurantName: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'Restaurant logo image URL',
    nullable: true,
  })
  readonly restaurantLogo: string | null;

  constructor(init: { restaurantName: string; restaurantLogo: string | null }) {
    this.restaurantName = init.restaurantName;
    this.restaurantLogo = init.restaurantLogo;
  }
}
