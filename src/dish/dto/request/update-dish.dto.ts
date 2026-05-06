import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDTO } from './create-dish.dto';

export class UpdateDishDTO extends PartialType(CreateDishDTO) {}
