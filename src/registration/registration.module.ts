import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationExternalService } from './registration.external.service';
import { OwnerModule } from 'src/owner/owner.module';
import { DriverModule } from 'src/driver/driver.module';
import { RestaurantInternalModule } from 'src/restaurant/restaurant-internal.module';
import { DishInternalModule } from 'src/dish/dish-internal.module';
import { UserInternalModule } from 'src/user/user-internal.module';
import { ClientInternalModule } from 'src/client/module/client.internal.module';

@Module({
  imports: [
    ClientInternalModule,
    DriverModule,
    OwnerModule,
    UserInternalModule,
    RestaurantInternalModule,
    DishInternalModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationExternalService],
})
export class RegistrationModule {}
