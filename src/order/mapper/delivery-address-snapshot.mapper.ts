import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateDeliveryAddressSnapshotData } from '../types/create-delivery-address-snapshot-data';
import { ReadDeliveryAddressData } from 'src/client/types/read-delivery-address.data';
import { ReadDeliveryAddressSnapshotData } from '../types/read-delivery-address-snapshot-data';
import { DeliveryAddressSnapshotDTO } from '../dto/delivery-address-snapshot.dto';

@Injectable()
export class DeliveryAddressSnapshotMapper {
  constructor(private readonly sharedService: SharedService) {}

  toCreateData(
    orderId: string,
    data: ReadDeliveryAddressData,
  ): CreateDeliveryAddressSnapshotData {
    return new CreateDeliveryAddressSnapshotData({
      deliveryAddressSnapshotId: this.sharedService.generateId(),
      orderId,
      ...data,
    });
  }

  readDataToDTO(
    data: ReadDeliveryAddressSnapshotData,
  ): DeliveryAddressSnapshotDTO {
    return new DeliveryAddressSnapshotDTO({
      ...data,
    });
  }
}
