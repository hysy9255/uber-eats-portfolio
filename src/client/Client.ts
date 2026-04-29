export class Client {
  constructor(
    private readonly clientId: string,
    private readonly defaultDeliveryAddressId: string,
  ) {}

  ensureOwnsAddress(addressId: string) {
    if (addressId !== this.defaultDeliveryAddressId) {
      throw new Error('Invalid delivery address');
    }
  }

  //   ensureOwnsAddress(deliveryAddressId: string) {
  //     const ownsAddress = this.deliveryAddresses.some(
  //       (address) => address.deliveryAddressId === deliveryAddressId,
  //     );

  //     if (!ownsAddress) {
  //       throw new ForbiddenException('Invalid delivery address');
  //     }
  //   }

  //   ensureIsDefault(deliveryAddressId: string) {
  //     const isDefault = this.deliveryAddresses.some(
  //       (address) =>
  //         address.deliveryAddressId === deliveryAddressId && address.isDefault,
  //     );

  //     if (!isDefault) {
  //       throw new ForbiddenException('Delivery address must be default');
  //     }
  //   }
}
