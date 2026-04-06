import { AddressAliasType } from 'src/constants/addressAliasType';

export class UpdateDeliveryAddressDTO {
  deliveryAddressId: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  alias: AddressAliasType;
  customAlias?: string;
}
