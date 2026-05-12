import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error saving delivery address:', e);
      throw new InternalServerErrorException('Failed to save delivery address');
    }
  }

  async update(data: UpdateDeliveryAddressData) {
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error updating delivery address:', e);
      throw new InternalServerErrorException(
        'Failed to update delivery address',
      );
    }
  }

  async delete(deliveryAddressId: string) {
    try {
      await this.repo.delete({ deliveryAddressId });
    } catch (e) {
      console.error('Error deleting delivery address:', e);
      throw new InternalServerErrorException(
        'Failed to delete delivery address',
      );
    }
  }

  async updateDefault(data: SetDefaultDeliveryAddressData) {
    try {
      await this.repo.save(this.repo.create(data));
    } catch (e) {
      console.error('Error setting default delivery address:', e);
      throw new InternalServerErrorException(
        'Failed to set default delivery address',
      );
    }
  }

  async findOneById(
    deliveryAddressId: string,
  ): Promise<ReadDeliveryAddressData | undefined> {
    try {
      return await this.baseReadQb()
        .where('d.deliveryAddressId = :deliveryAddressId', {
          deliveryAddressId,
        })
        .getRawOne<ReadDeliveryAddressData>();
    } catch (e) {
      console.error('Error finding delivery address by ID:', e);
      throw new InternalServerErrorException(
        'Failed to find delivery address by ID',
      );
    }
  }

  async findOneByIdAndClientId(
    deliveryAddressId: string,
    clientId: string,
  ): Promise<ReadDeliveryAddressData | undefined> {
    try {
      return await this.baseReadQb()
        .where('d.deliveryAddressId = :deliveryAddressId', {
          deliveryAddressId,
        })
        .andWhere('d.clientId = :clientId', { clientId })
        .getRawOne<ReadDeliveryAddressData>();
    } catch (e) {
      console.error('Error finding delivery address by ID and client ID:', e);
      throw new InternalServerErrorException(
        'Failed to find delivery address by ID and client ID',
      );
    }
  }

  async findDefaultAddress(
    clientId: string,
  ): Promise<ReadDeliveryAddressData | undefined> {
    try {
      return await this.baseReadQb()
        .where('d.clientId = :clientId', { clientId })
        .andWhere('d.isDefault = :isDefault', { isDefault: true })
        .getRawOne<ReadDeliveryAddressData>();
    } catch (e) {
      console.error('Error finding default delivery address:', e);
      throw new InternalServerErrorException(
        'Failed to find default delivery address',
      );
    }
  }

  async findByClientId(clientId: string): Promise<ReadDeliveryAddressData[]> {
    try {
      return await this.baseReadQb()
        .where('d.clientId = :clientId', { clientId })
        .getRawMany<ReadDeliveryAddressData>();
    } catch (e) {
      console.error('Error finding delivery addresses by client ID:', e);
      throw new InternalServerErrorException(
        'Failed to find delivery addresses by client ID',
      );
    }
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
