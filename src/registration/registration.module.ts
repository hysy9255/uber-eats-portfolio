import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { OwnerModule } from 'src/owner/owner.module';
import { DriverModule } from 'src/driver/driver.module';
import { DishInternalModule } from 'src/dish/dish-internal.module';
import { UserInternalModule } from 'src/user/user-internal.module';
import { ClientInternalModule } from 'src/client/module/client.internal.module';
import { RegistrationService } from './registration.external.service';

@Module({
  imports: [
    ClientInternalModule,
    DriverModule,
    OwnerModule,
    UserInternalModule,
    DishInternalModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}

// private readonly user: UserInternalService,
// private readonly clientOnBoard: ClientOnBoardService,
// private readonly driverOnBoard: DriverOnBoardService,
// private readonly ownerOnBoard: OwnerOnBoardService,
