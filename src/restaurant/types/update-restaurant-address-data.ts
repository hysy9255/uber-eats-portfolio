export class UpdateRestaurantAddressData {
  restaurantAddressId: string;
  restaurantId: string;
  streetAddress?: string;
  unit?: string;
  state?: string;
  city?: string;
  zip?: string;

  constructor(init: {
    restaurantAddressId: string;
    restaurantId: string;
    streetAddress?: string;
    unit?: string;
    state?: string;
    city?: string;
    zip?: string;
  }) {
    this.restaurantAddressId = init.restaurantAddressId;
    this.restaurantId = init.restaurantId;
    this.streetAddress = init.streetAddress;
    this.unit = init.unit;
    this.state = init.state;
    this.city = init.city;
    this.zip = init.zip;
  }
}
