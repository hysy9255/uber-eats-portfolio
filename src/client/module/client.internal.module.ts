import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { ClientRepository } from '../repository/client.repository';
import { ClientInternalService } from '../service/client.internal.service';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { DeliveryAddressEntity } from '../orm-entity/delivery-address.orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, DeliveryAddressEntity])],
  providers: [
    ClientInternalService,
    ClientRepository,
    DeliveryAddressRepository,
    DeliveryAddressMapper,
  ],
  exports: [ClientInternalService],
})
export class ClientInternalModule {}
