export class RestaurantAddressDTO {
  streetAddress: string;
  unit: string;
  state: string;
  city: string;
  zip: string;

  constructor(init: {
    streetAddress: string;
    unit: string;
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
