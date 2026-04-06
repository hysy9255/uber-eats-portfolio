import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repository/client.repository';
import { SharedService } from 'src/shared/shared.service';
import { CreateDeliveryAddressDTO } from '../dto/create-delivery-address.dto';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { ReadDeliveryAddressData } from '../types/read-delivery-address.data';
import { ClientInfoDTO } from '../dto/client-info.dto';

@Injectable()
export class ClientInternalService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly deliveryAddressRepo: DeliveryAddressRepository,
    private readonly deliveryAddressMapper: DeliveryAddressMapper,
    private readonly sharedService: SharedService,
  ) {}

  async createClient(userId: string): Promise<{ clientId: string }> {
    const clientId = this.sharedService.generateId();
    await this.clientRepo.save(userId, clientId);
    return { clientId };
  }

  async createDeliveryAddress(clientId: string, dto: CreateDeliveryAddressDTO) {
    const createData = this.deliveryAddressMapper.dtoToCreateData(
      clientId,
      dto,
    );
    await this.deliveryAddressRepo.save(createData);
  }

  async getClientByUserId(userId: string): Promise<{ clientId: string }> {
    return await this.clientRepo.findByUserId(userId);
  }

  async getDeliveryAddressById(
    deliveryAddressId: string,
  ): Promise<ReadDeliveryAddressData> {
    return await this.deliveryAddressRepo.findById(deliveryAddressId);
  }

  async getClientInfoByIds(clientIds: string[]): Promise<ClientInfoDTO[]> {
    const readData = await this.clientRepo.findClientInfoByIds(clientIds);
    return readData.map((d) => new ClientInfoDTO({ ...d }));
  }
}
