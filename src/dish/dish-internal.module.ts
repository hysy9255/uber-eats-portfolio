import { Module } from '@nestjs/common';
import { DishInternalService } from './dish.internal.service';
import { DishRepository } from './dish.repository';
import { DishMapper } from './dish.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from './orm-entities/dish.orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishEntity])],
  providers: [DishInternalService, DishRepository, DishMapper],
  exports: [DishInternalService],
})
export class DishInternalModule {}
