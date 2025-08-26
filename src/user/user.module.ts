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
import { UserDomainService } from './service/user.domain.service';
import { ClientIdReader } from './repository/reader/client.id.reader';
import { DriverIdReader } from './repository/reader/driver.id.reader';
import { RestaurantIdReader } from './repository/reader/restaurant.id.reader';
import { RestaurantEntity } from 'src/restaurant/orm-entities/restaurant.orm.entity';

const services = [UserService, UserDomainService];
const repositories = [ClientRepository, DriverRepository, OwnerRepository];
const readers = [ClientIdReader, DriverIdReader, RestaurantIdReader];
const entities = [
  UserEntity,
  OwnerEntity,
  ClientEntity,
  DriverEntity,
  RestaurantEntity,
];

@Module({
  imports: [
    AuthModule,
    SharedModule,
    JwtModule,
    BcryptModule,
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [UserController],
  providers: [...services, ...repositories, UserRepository, ...readers],
  exports: [...services, ...repositories, ...readers],
})
export class UserModule {}
