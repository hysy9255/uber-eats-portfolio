import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryAddressEntity } from '../orm-entity/delivery-address.orm.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryAddressData } from '../types/create-delivery-address.data';
import { UpdateDeliveryAddressData } from '../types/update-delivery-address.data';
import { ReadDeliveryAddressData } from '../types/read-delivery-address.data';
import { SetDefaultDeliveryAddressData } from '../types/set-default-delivery-address.data';

@Injectable()
export class DeliveryAddressRepository {
  constructor(
    @InjectRepository(DeliveryAddressEntity)
    private readonly deliveryAddressRepo: Repository<DeliveryAddressEntity>,
  ) {}

  async save(data: CreateDeliveryAddressData) {
    await this.deliveryAddressRepo.save(this.deliveryAddressRepo.create(data));
  }

  async update(data: UpdateDeliveryAddressData) {
    await this.deliveryAddressRepo.save(this.deliveryAddressRepo.create(data));
  }

  async delete(deliveryAddressId: string) {
    await this.deliveryAddressRepo.delete({ deliveryAddressId });
  }

  async updateDefault(data: SetDefaultDeliveryAddressData) {
    await this.deliveryAddressRepo.save(this.deliveryAddressRepo.create(data));
  }

  async findById(deliveryAddressId: string): Promise<ReadDeliveryAddressData> {
    const row = await this.deliveryAddressRepo
      .createQueryBuilder('d')
      .select([
        'd.deliveryAddressId AS "deliveryAddressId"',
        'd.streetAddress AS "streetAddress"',
        'd.apt AS apt',
        'd.city AS city',
        'd.state AS state',
        'd.zip AS zip',
        'd.isDefault AS "isDefault"',
        'd.alias AS alias',
        'd.customAlias AS "customAlias"',
        'd.clientId AS "clientId"',
      ])
      .where('d.deliveryAddressId = :deliveryAddressId', { deliveryAddressId })
      .getRawOne<ReadDeliveryAddressData>();

    if (!row) throw new Error('Address Not Found');
    return row;
  }

  async findDefaultAddress(clientId: string): Promise<ReadDeliveryAddressData> {
    const row = await this.deliveryAddressRepo
      .createQueryBuilder('d')
      .select([
        'd.deliveryAddressId AS "deliveryAddressId"',
        'd.streetAddress AS "streetAddress"',
        'd.apt AS apt',
        'd.city AS city',
        'd.state AS state',
        'd.zip AS zip',
        'd.isDefault AS "isDefault"',
        'd.alias AS alias',
        'd.customAlias AS "customAlias"',
        'd.clientId AS "clientId"',
      ])
      .where('d.clientId = :clientId', { clientId })
      .andWhere('d.isDefault = :isDefault', { isDefault: true })
      .getRawOne<ReadDeliveryAddressData>();

    if (!row) throw new Error('Address Not Found');
    return row;
  }

  async findAllByClientId(
    clientId: string,
  ): Promise<ReadDeliveryAddressData[]> {
    return await this.deliveryAddressRepo
      .createQueryBuilder('d')
      .select([
        'd.deliveryAddressId AS "deliveryAddressId"',
        'd.streetAddress AS "streetAddress"',
        'd.apt AS apt',
        'd.city AS city',
        'd.state AS state',
        'd.zip AS zip',
        'd.isDefault AS "isDefault"',
        'd.alias AS alias',
        'd.customAlias AS "customAlias"',
        'd.clientId AS "clientId"',
      ])
      .where('d.clientId = :clientId', { clientId })
      .getRawMany<ReadDeliveryAddressData>();
  }
}
