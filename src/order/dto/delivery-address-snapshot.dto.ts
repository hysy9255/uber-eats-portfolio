export class DeliveryAddressSnapshotDTO {
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
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
