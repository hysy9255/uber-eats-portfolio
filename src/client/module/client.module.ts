import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddressEntity } from '../orm-entity/delivery-address.orm.entity';
import { ClientEntity } from '../orm-entity/client.orm.entity';
import { ClientRepository } from '../repository/client.repository';
import { DeliveryAddressRepository } from '../repository/delivery-address.repository';
import { DeliveryAddressMapper } from '../mapper/delivery-address.mapper';
import { ClientController } from '../controller/client.controller';
import { ClientService } from '../service/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryAddressEntity, ClientEntity])],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientRepository,
    DeliveryAddressRepository,
    DeliveryAddressMapper,
  ],
})
export class ClientModule {}
