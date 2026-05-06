import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryAddressSnapshotEntity } from '../orm-entity/delivery-address-snapshot.orm.entity';
import { CreateDeliveryAddressSnapshotData } from '../types/create-delivery-address-snapshot-data';

@Injectable()
export class DeliveryAddressSnapshotRepository {
  constructor(
    @InjectRepository(DeliveryAddressSnapshotEntity)
    private readonly deliveryAddressSnapshotRepo: Repository<DeliveryAddressSnapshotEntity>,
  ) {}

  async save(data: CreateDeliveryAddressSnapshotData) {
    await this.deliveryAddressSnapshotRepo.save(
      this.deliveryAddressSnapshotRepo.create(data),
    );
  }
}
