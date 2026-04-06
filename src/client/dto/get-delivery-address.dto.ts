export class GetDeliveryAddressDTO {
  deliveryAddressId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: string;
  customAlias?: string;
  isDefault: boolean;

  constructor(init: {
    deliveryAddressId: string;
    streetAddress: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
    alias: string;
    customAlias?: string;
    isDefault: boolean;
  }) {
    this.deliveryAddressId = init.deliveryAddressId;
    this.streetAddress = init.streetAddress;
    this.apt = init.apt;
    this.city = init.city;
    this.state = init.state;
    this.zip = init.zip;
    this.alias = init.alias;
    this.customAlias = init.customAlias;
    this.isDefault = init.isDefault;
  }
}
