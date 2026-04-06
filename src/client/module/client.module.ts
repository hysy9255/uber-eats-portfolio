import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddressEntity } from '../orm-entity/delivery-address.orm.entity';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { ClientExternalService } from '../service/client.external.service';
import { ClientRepository } from '../repository/client.repository';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { ClientController } from '../controller/client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryAddressEntity, ClientEntity])],
  controllers: [ClientController],
  providers: [
    ClientExternalService,
    ClientRepository,
    DeliveryAddressRepository,
    DeliveryAddressMapper,
  ],
})
export class ClientModule {}
