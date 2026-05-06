import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateDeliveryAddressSnapshotData } from '../types/create-delivery-address-snapshot-data';
import { ReadDeliveryAddressData } from 'src/client/types/read-delivery-address.data';

@Injectable()
export class DeliveryAddressSnapshotMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    orderId: string,
    data: ReadDeliveryAddressData,
  ): CreateDeliveryAddressSnapshotData {
    return new CreateDeliveryAddressSnapshotData({
      deliveryAddressSnapshotId: this.sharedService.generateId(),
      orderId,
      ...data,
    });
  }
}
