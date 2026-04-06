import { AddressAliasType } from 'src/constants/addressAliasType';

export class UpdateDeliveryAddressData {
  deliveryAddressId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: AddressAliasType;
  customAlias?: string;

  constructor(init: {
    deliveryAddressId: string;
    streetAddress: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
    alias: AddressAliasType;
    customAlias?: string;
  }) {
    this.deliveryAddressId = init.deliveryAddressId;
    this.streetAddress = init.streetAddress;
    this.apt = init.apt;
    this.city = init.city;
    this.state = init.state;
    this.zip = init.zip;
    this.alias = init.alias;
    this.customAlias = init.customAlias;
  }
}
