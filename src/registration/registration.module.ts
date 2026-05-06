import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { OwnerModule } from 'src/owner/owner.module';
import { DriverModule } from 'src/driver/driver.module';
import { UserModule } from 'src/user/user.module';
import { ClientModule } from 'src/client/client.module';
import { RegistrationService } from './service/registration.service';

@Module({
  imports: [ClientModule, DriverModule, OwnerModule, UserModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
