import { Module } from '@nestjs/common';
import { DeliveryAddressMapper } from './mapper/delivery-address.mapper';
import { ClientService } from './service/client.service';
import { ClientOnBoardService } from './service/client.onboard.service';
import { ClientController } from './client.controller';

@Module({
  controllers: [ClientController],
  providers: [ClientService, DeliveryAddressMapper, ClientOnBoardService],
  exports: [ClientOnBoardService],
})
export class ClientModule {}
