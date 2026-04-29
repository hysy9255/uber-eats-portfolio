import { OrderType } from 'src/constants/orderType';
// import { RestaurantProps } from '../schema/restaurant-props.schema';
import { DayHoursDTO } from '../dto/operatingHours/day-hours.dto';

// export class Restaurant {
//   constructor(private readonly props: RestaurantProps) {}
// }

export class GeneralInfo {
  logo?: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  website?: string;
  instagram?: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
  deliveryRadius: number;
  prepTime: number;
  orderType: OrderType;
}

export class Address {
  streetAddress: string;
  unit: string;
  state: string;
  city: string;
  zip: string;
}

export class Hours {
  Mon: DayHoursDTO;
  Tue: DayHoursDTO;
  Wed: DayHoursDTO;
  Thu: DayHoursDTO;
  Fri: DayHoursDTO;
  Sat: DayHoursDTO;
  Sun: DayHoursDTO;
}

export class Restaurant {
  constructor(
    private readonly restaurantId: string,
    private readonly ownerId: string,
    private readonly generalInfo: GeneralInfo,
    private readonly operatingHours: Hours,
  ) {}
}
