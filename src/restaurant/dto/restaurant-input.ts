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

  @ApiProperty({
    example: 'restaurant image url',
    description: 'restaurant image url',
  })
  restaurantImgUrl: string;

  @ApiProperty({
    example: 'second restaurant image url',
    description: 'second restaurant image url',
  })
  restaurantImgUrl2: string;

  @ApiProperty({
    example: 'third restaurant image url',
    description: 'third restaurant image url',
  })
  restaurantImgUrl3: string;
}

export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {}

export class UpdateRestaurantInputV2 {
  updateBusinessInput: UpdateBusinessInput;
  updateLocationAndHoursInput: UpdateLocationAndHoursInput;
}

// export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

// export interface DayHours {
//   open: string; // "09:00" 같은 value
//   close: string; // "21:00"
//   open24: boolean;
//   closed: boolean;
// }

export class DayHoursDto {
  @ApiProperty({ example: '09:00' })
  // @IsString()
  // @Matches(/^\d{2}:\d{2}$/)
  open: string;

  @ApiProperty({ example: '21:00' })
  // @IsString()
  // @Matches(/^\d{2}:\d{2}$/)
  close: string;

  @ApiProperty({ example: false })
  // @IsBoolean()
  open24: boolean;

  @ApiProperty({ example: false })
  // @IsBoolean()
  closed: boolean;
}

export class HoursDto {
  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Mon: DayHoursDto;

  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Tue: DayHoursDto;

  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Wed: DayHoursDto;

  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Thu: DayHoursDto;

  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Fri: DayHoursDto;

  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Sat: DayHoursDto;

  @ApiProperty({ type: DayHoursDto })
  // @ValidateNested()
  // @Type(() => DayHoursDto)
  Sun: DayHoursDto;
}

export class CreateLocationAndHoursInput {
  @ApiProperty({
    example: '5 Doyers St',
    description: 'Street address of the business',
  })
  streetAddress: string;
  @ApiProperty({
    example: 'Suite 2',
    description: 'Unit or suite number of the business',
  })
  unit: string;
  @ApiProperty({
    example: 'NYC',
    description: 'City where the business is located',
  })
  city: string;
  @ApiProperty({
    example: 'NY',
    description: 'State where the business is located',
  })
  state: string;
  @ApiProperty({
    example: '10013',
    description: 'ZIP code of the business location',
  })
  zip: string;
  @ApiProperty({
    example: {
      Mon: { open: '09:00', close: '21:00', open24: false, closed: false },
      Tue: { open: '09:00', close: '21:00', open24: false, closed: false },
      Wed: { open: '09:00', close: '21:00', open24: false, closed: false },
      Thu: { open: '09:00', close: '21:00', open24: false, closed: false },
      Fri: { open: '09:00', close: '23:00', open24: false, closed: false },
      Sat: { open: '10:00', close: '23:00', open24: false, closed: false },
      Sun: { open: '10:00', close: '20:00', open24: false, closed: false },
    },
    description: 'hours of operation for each day of the week',
  })
  hours: HoursDto;
  @ApiProperty({
    example: '5',
    description: 'Delivery radius in miles',
  })
  deliveryRadius: string;
  @ApiProperty({
    example: '30',
    description: 'Estimated preparation time for orders',
  })
  prepTime: string;
  @ApiProperty({
    example: 'delivery',
    description: 'Type of orders accepted (e.g., delivery, pickup, dine-in)',
  })
  orderType: string;
}

export class UpdateLocationAndHoursInput extends PartialType(
  CreateLocationAndHoursInput,
) {}

export class CreateBusinessInput {
  @ApiProperty({
    example: 'Tuxedo Dining LLC',
    description: 'Legal business name',
  })
  lbn: string;
  @ApiProperty({
    example: 'Chinese Tuxedo',
    description: 'Doing business as name',
  })
  dba: string;
  @ApiProperty({
    example: 'Chinese, Dim Sum, Noodles',
    description: 'Cuisine type',
  })
  cuisineType: string;
  @ApiProperty({
    example: '(123) 456-7890',
    description: 'restaurant phone number',
  })
  storePhone: string;
  @ApiProperty({
    example: 'contact@chinesetuxedo.com',
    description: 'restaurant business email',
  })
  businessEmail: string;
  @ApiProperty({
    example: 'www.chinesetuxedo.com',
    description: 'restaurant website',
  })
  website: string;
  @ApiProperty({
    example: '@chinesetuxedo',
    description: 'restaurant Instagram handle',
  })
  instagram: string;
  @ApiProperty({
    example: '123 Main St, San Francisco, CA 94103',
    description: 'restaurant address',
  })
  address: string;
  @ApiProperty({
    example: 'USA',
    description: 'restaurant country',
  })
  country: string;
  @ApiProperty({
    example: 'CA',
    description: 'restaurant state',
  })
  state: string;
  @ApiProperty({
    example:
      'https://platform.ny.eater.com/wp-content/uploads/sites/6/chorus/uploads/chorus_asset/file/13064939/Chinese_Tuxedo_Eater_review_photos_by_Daniel_Krieger-1057.0.0.1505327944.jpg?quality=90&strip=all&crop=3.5743547726342%2C0%2C92.851290454732%2C100&w=2400',
    description: 'Main image URL of the restaurant',
  })
  mainImgUrl: string;
  @ApiProperty({
    example:
      'https://platform.ny.eater.com/wp-content/uploads/sites/6/chorus/uploads/chorus_asset/file/13064939/Chinese_Tuxedo_Eater_review_photos_by_Daniel_Krieger-1057.0.0.1505327944.jpg?quality=90&strip=all&crop=3.5743547726342%2C0%2C92.851290454732%2C100&w=2400',
    description: 'First sub image URL of the restaurant',
  })
  sub1ImgUrl: string;
  @ApiProperty({
    example:
      'https://platform.ny.eater.com/wp-content/uploads/sites/6/chorus/uploads/chorus_asset/file/13064939/Chinese_Tuxedo_Eater_review_photos_by_Daniel_Krieger-1057.0.0.1505327944.jpg?quality=90&strip=all&crop=3.5743547726342%2C0%2C92.851290454732%2C100&w=2400',
    description: 'Second sub image URL of the restaurant',
  })
  sub2ImgUrl: string;
}

export class UpdateBusinessInput extends PartialType(CreateBusinessInput) {}
