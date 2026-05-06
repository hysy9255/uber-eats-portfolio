import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryAddressEntity } from '../orm-entity/delivery-address.orm.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateDeliveryAddressData } from '../types/create-delivery-address.data';
import { UpdateDeliveryAddressData } from '../types/update-delivery-address.data';
import { ReadDeliveryAddressData } from '../types/read-delivery-address.data';
import { SetDefaultDeliveryAddressData } from '../types/set-default-delivery-address.data';

@Injectable()
export class DeliveryAddressRepository {
  constructor(
    @InjectRepository(DeliveryAddressEntity)
    private readonly repo: Repository<DeliveryAddressEntity>,
  ) {}

  async save(data: CreateDeliveryAddressData) {
    await this.repo.save(this.repo.create(data));
  }

  async update(data: UpdateDeliveryAddressData) {
    await this.repo.save(this.repo.create(data));
  }

  async delete(deliveryAddressId: string) {
    await this.repo.delete({ deliveryAddressId });
  }

  async updateDefault(data: SetDefaultDeliveryAddressData) {
    await this.repo.save(this.repo.create(data));
  }

  async findOneById(
    deliveryAddressId: string,
  ): Promise<ReadDeliveryAddressData | undefined> {
    return await this.baseReadQb()
      .where('d.deliveryAddressId = :deliveryAddressId', { deliveryAddressId })
      .getRawOne<ReadDeliveryAddressData>();
  }

  async findOneByIdAndClientId(
    deliveryAddressId: string,
    clientId: string,
  ): Promise<ReadDeliveryAddressData | undefined> {
    return await this.baseReadQb()
      .where('d.deliveryAddressId = :deliveryAddressId', { deliveryAddressId })
      .andWhere('d.clientId = :clientId', { clientId })
      .getRawOne<ReadDeliveryAddressData>();
  }

  async findDefaultAddress(
    clientId: string,
  ): Promise<ReadDeliveryAddressData | undefined> {
    return await this.baseReadQb()
      .where('d.clientId = :clientId', { clientId })
      .andWhere('d.isDefault = :isDefault', { isDefault: true })
      .getRawOne<ReadDeliveryAddressData>();
  }

  async findByClientId(clientId: string): Promise<ReadDeliveryAddressData[]> {
    return await this.baseReadQb()
      .where('d.clientId = :clientId', { clientId })
      .getRawMany<ReadDeliveryAddressData>();
  }

  private baseReadQb(): SelectQueryBuilder<DeliveryAddressEntity> {
    return this.repo
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
      ]);
  }
}
