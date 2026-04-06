import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateDeliveryAddressDTO } from '../dto/create-delivery-address.dto';
import { CreateDeliveryAddressData } from '../types/create-delivery-address.data';
import { UpdateDeliveryAddressDTO } from '../dto/update-delivery-address.dto';
import { UpdateDeliveryAddressData } from '../types/update-delivery-address.data';
import { ReadDeliveryAddressData } from '../types/read-delivery-address.data';
import { GetDeliveryAddressDTO } from '../dto/get-delivery-address.dto';
import { SetDefaultDeliveryAddressData } from '../types/set-default-delivery-address.data';

@Injectable()
export class DeliveryAddressMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    clientId: string,
    dto: CreateDeliveryAddressDTO,
  ): CreateDeliveryAddressData {
    return new CreateDeliveryAddressData({
      deliveryAddressId: this.sharedService.generateId(),
      clientId,
      ...dto,
    });
  }

  dtoToUpdateData(dto: UpdateDeliveryAddressDTO): UpdateDeliveryAddressData {
    return new UpdateDeliveryAddressData({ ...dto });
  }

  readDataToDto(data: ReadDeliveryAddressData): GetDeliveryAddressDTO {
    return new GetDeliveryAddressDTO({ ...data });
  }

  readToSetDefaultAddressData(
    data: ReadDeliveryAddressData,
  ): SetDefaultDeliveryAddressData {
    return new SetDefaultDeliveryAddressData({ ...data });
  }
}
