import { Module } from '@nestjs/common';
import { DishService } from './service/dish.service';
import { DishController } from './dish.controller';
import { DishDTOAssembler } from './assembler/dish-dto.assembler';
import { DishRegisterService } from './service/dish.register.service';
import { DishMapper } from './mapper/dish.mapper';
import { DishValidationService } from './service/dish.validation.service';

@Module({
  controllers: [DishController],
  providers: [
    DishService,
    DishMapper,
    DishValidationService,
    DishDTOAssembler,
    DishRegisterService,
  ],
  exports: [DishRegisterService],
})
export class DishModule {}
