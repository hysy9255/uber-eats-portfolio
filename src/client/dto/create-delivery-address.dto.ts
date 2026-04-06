import { AddressAliasType } from 'src/constants/addressAliasType';

export class CreateDeliveryAddressDTO {
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  alias: AddressAliasType;
  customAlias?: string;
}
