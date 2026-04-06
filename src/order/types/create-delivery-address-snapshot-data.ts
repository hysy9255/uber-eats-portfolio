export class CreateDeliveryAddressSnapshotData {
  deliveryAddressSnapshotId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  orderId: string;

  constructor(init: {
    deliveryAddressSnapshotId: string;
    streetAddress: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
    orderId: string;
  }) {
    this.deliveryAddressSnapshotId = init.deliveryAddressSnapshotId;
    this.streetAddress = init.streetAddress;
    this.apt = init.apt;
    this.city = init.city;
    this.state = init.state;
    this.zip = init.zip;
    this.orderId = init.orderId;
  }
}
