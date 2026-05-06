import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { GetDeliveryAddressDTO } from '../dto/get-delivery-address.dto';
import { CreateDeliveryAddressDTO } from '../dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDTO } from '../dto/update-delivery-address.dto';
import { DeleteDeliveryAddressDTO } from '../dto/delete-delivery-address.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly addressRepo: DeliveryAddressRepository,
    private readonly addressMapper: DeliveryAddressMapper,
  ) {}

  async getDeliveryAddresses(
    clientId: string,
  ): Promise<GetDeliveryAddressDTO[]> {
    const data = await this.addressRepo.findByClientId(clientId);
    return data.map((d) => this.addressMapper.readDataToDto(d));
  }

  async setDefaultAddress(clientId: string, deliveryAddressId: string) {
    const address = await this.addressRepo.findDefaultAddress(clientId);
    if (!address) throw new Error('Address Not found');
    address.isDefault = false;
    await this.addressRepo.updateDefault(
      this.addressMapper.readToSetDefaultAddressData(address),
    );

    const newDefaultAddress =
      await this.addressRepo.findOneById(deliveryAddressId);

    if (!newDefaultAddress) throw new Error('Address Not found');

    if (newDefaultAddress.clientId !== clientId) {
      throw new Error('You are not authorized to set default address');
    }
    newDefaultAddress.isDefault = true;
    await this.addressRepo.updateDefault(
      this.addressMapper.readToSetDefaultAddressData(newDefaultAddress),
    );
  }

  async addNewDeliveryAddress(clientId: string, dto: CreateDeliveryAddressDTO) {
    const createData = this.addressMapper.dtoToCreateData(clientId, dto);
    await this.addressRepo.save(createData);
  }

  async updateDeliveryAddress(clientId: string, dto: UpdateDeliveryAddressDTO) {
    const deliveryAddress = await this.addressRepo.findOneById(
      dto.deliveryAddressId,
    );

    if (!deliveryAddress) throw new Error('Address Not found');

    if (deliveryAddress.clientId !== clientId) {
      throw new Error('You are not authorized to update the address');
    }

    const updateData = this.addressMapper.dtoToUpdateData(dto);
    await this.addressRepo.update(updateData);
  }

  async deleteDeliveryAddress(
    clientId: string,
    { deliveryAddressId }: DeleteDeliveryAddressDTO,
  ) {
    const deliveryAddress =
      await this.addressRepo.findOneById(deliveryAddressId);
    if (!deliveryAddress) throw new Error('Address Not found');

    if (deliveryAddress.isDefault)
      throw new BadRequestException('Default address cannot be deleted');
    if (deliveryAddress.clientId !== clientId) {
      throw new UnauthorizedException(
        'You are not authorized to delete the address',
      );
    }
    await this.addressRepo.delete(deliveryAddressId);
  }
}
