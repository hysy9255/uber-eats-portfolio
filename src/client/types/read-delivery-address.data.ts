import { AddressAliasType } from 'src/constants/addressAliasType';

export class ReadDeliveryAddressData {
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
}
