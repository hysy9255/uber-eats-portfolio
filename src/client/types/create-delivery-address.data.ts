import { AddressAliasType } from 'src/constants/addressAliasType';

export class CreateDeliveryAddressData {
  deliveryAddressId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  alias: AddressAliasType;
  customAlias?: string;
  clientId: string;

  constructor(init: {
    deliveryAddressId: string;
    streetAddress: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
    alias: AddressAliasType;
    customAlias?: string;
    clientId: string;
  }) {
    this.deliveryAddressId = init.deliveryAddressId;
    this.streetAddress = init.streetAddress;
    this.apt = init.apt;
    this.city = init.city;
    this.state = init.state;
    this.zip = init.zip;
    this.isDefault = init.isDefault;
    this.alias = init.alias;
    this.customAlias = init.customAlias;
    this.clientId = init.clientId;
  }
}
