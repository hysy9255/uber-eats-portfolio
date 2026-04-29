import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { ClientRepository } from '../repository/client.repository';
import { DeliveryAddressEntity } from '../orm-entity/delivery-address.orm.entity';
import { ClientAggregateRepository } from '../repository/client.aggregate.repository';
import { ClientLoader } from '../service/client.loader';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, DeliveryAddressEntity])],
  providers: [ClientLoader, ClientRepository, ClientAggregateRepository],
  exports: [ClientLoader, ClientRepository],
})
export class ClientInternalModule {}
