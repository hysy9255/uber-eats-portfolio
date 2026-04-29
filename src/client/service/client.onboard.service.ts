import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repository/client.repository';
import { SharedService } from 'src/shared/shared.service';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { CreateDeliveryAddressDTO } from '../dto/create-delivery-address.dto';

@Injectable()
export class ClientOnBoardService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly clientRepo: ClientRepository,
    private readonly addressRepo: DeliveryAddressRepository,
    private readonly addressMapper: DeliveryAddressMapper,
  ) {}

  async onBoard(userId: string, address: CreateDeliveryAddressDTO) {
    const clientId = this.sharedService.generateId();
    await this.clientRepo.save(userId, clientId);

    const addressData = this.addressMapper.dtoToCreateData(clientId, address);
    await this.addressRepo.save(addressData);
  }
}
