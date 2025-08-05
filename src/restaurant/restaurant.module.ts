import { Module } from '@nestjs/common';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantRepository } from './repository/restaurant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './orm-entities/restaurant.orm.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule {}
