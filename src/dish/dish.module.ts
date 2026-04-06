import { Module } from '@nestjs/common';
import { DishExternalService } from './dish.external.service';
import { DishRepository } from './dish.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from './orm-entities/dish.orm.entity';
import { DishController } from './dish.controller';
import { DishMapper } from './dish.mapper';
import { OwnerModule } from 'src/owner/owner.module';
import { RestaurantInternalModule } from 'src/restaurant/restaurant-internal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DishEntity]),
    OwnerModule,
    RestaurantInternalModule,
  ],
  controllers: [DishController],
  providers: [DishExternalService, DishRepository, DishMapper],
})
export class DishModule {}
