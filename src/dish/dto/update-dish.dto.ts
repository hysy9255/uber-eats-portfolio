import { CreateDishDTO } from './create-dish.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDishDTO extends PartialType(CreateDishDTO) {}
