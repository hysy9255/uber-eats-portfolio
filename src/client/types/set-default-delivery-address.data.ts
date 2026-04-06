export class SetDefaultDeliveryAddressData {
  deliveryAddressId: string;
  isDefault: boolean;

  constructor(init: { deliveryAddressId: string; isDefault: boolean }) {
    this.deliveryAddressId = init.deliveryAddressId;
    this.isDefault = init.isDefault;
  }
}
