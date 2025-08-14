import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.orm.entity';
import { UserRepository } from './repository/user.repository';
import { OwnerEntity } from './orm-entities/owner.orm.entity';
import { ClientEntity } from './orm-entities/client.orm.entity';
import { DriverEntity } from './orm-entities/driver.orm.entity';
import { JwtModule } from 'src/jwt/jwt.module';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientRepository } from './repository/client.repository';
import { DriverRepository } from './repository/driver.repository';
import { OwnerRepository } from './repository/owner.repository';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    JwtModule,
    BcryptModule,
    TypeOrmModule.forFeature([
      UserEntity,
      OwnerEntity,
      ClientEntity,
      DriverEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ClientRepository,
    DriverRepository,
    OwnerRepository,
  ],
  exports: [UserService, ClientRepository, DriverRepository, OwnerRepository],
})
export class UserModule {}
