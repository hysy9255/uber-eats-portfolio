import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientRepository } from '../repository/client.repository';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { GetDeliveryAddressDTO } from '../dto/get-delivery-address.dto';
import { CreateDeliveryAddressDTO } from '../dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDTO } from '../dto/update-delivery-address.dto';
import { DeleteDeliveryAddressDTO } from '../dto/delete-delivery-address.dto';

@Injectable()
export class ClientExternalService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly deliveryAddressRepo: DeliveryAddressRepository,
    private readonly deliveryAddressMapper: DeliveryAddressMapper,
  ) {}

  async getDeliveryAddresses(userId: string): Promise<GetDeliveryAddressDTO[]> {
    const { clientId } = await this.clientRepo.findByUserId(userId);
    const readData = await this.deliveryAddressRepo.findAllByClientId(clientId);
    return readData.map((d) => this.deliveryAddressMapper.readDataToDto(d));
  }

  async addNewDeliveryAddress(userId: string, dto: CreateDeliveryAddressDTO) {
    const { clientId } = await this.clientRepo.findByUserId(userId);
    const createData = this.deliveryAddressMapper.dtoToCreateData(
      clientId,
      dto,
    );
    await this.deliveryAddressRepo.save(createData);
  }

  async setDefaultAddress(userId: string, deliveryAddressId: string) {
    const { clientId } = await this.clientRepo.findByUserId(userId);
    const address = await this.deliveryAddressRepo.findDefaultAddress(clientId);
    address.isDefault = false;
    await this.deliveryAddressRepo.updateDefault(
      this.deliveryAddressMapper.readToSetDefaultAddressData(address),
    );

    const newDefaultAddress =
      await this.deliveryAddressRepo.findById(deliveryAddressId);

    if (newDefaultAddress.clientId !== clientId) {
      throw new Error('You are not authorized to set default address');
    }
    newDefaultAddress.isDefault = true;
    await this.deliveryAddressRepo.updateDefault(
      this.deliveryAddressMapper.readToSetDefaultAddressData(newDefaultAddress),
    );
  }

  async updateDeliveryAddress(userId: string, dto: UpdateDeliveryAddressDTO) {
    const { clientId } = await this.clientRepo.findByUserId(userId);

    const deliveryAddress = await this.deliveryAddressRepo.findById(
      dto.deliveryAddressId,
    );

    if (deliveryAddress.clientId !== clientId) {
      throw new Error('You are not authorized to update the address');
    }

    const updateData = this.deliveryAddressMapper.dtoToUpdateData(dto);
    await this.deliveryAddressRepo.update(updateData);
  }

  async deleteDeliveryAddress(
    userId: string,
    { deliveryAddressId }: DeleteDeliveryAddressDTO,
  ) {
    const { clientId } = await this.clientRepo.findByUserId(userId);
    const deliveryAddress =
      await this.deliveryAddressRepo.findById(deliveryAddressId);
    if (deliveryAddress.isDefault)
      throw new BadRequestException('Default address cannot be deleted');
    if (deliveryAddress.clientId !== clientId) {
      throw new UnauthorizedException(
        'You are not authorized to delete the address',
      );
    }
    await this.deliveryAddressRepo.delete(deliveryAddressId);
  }
}
