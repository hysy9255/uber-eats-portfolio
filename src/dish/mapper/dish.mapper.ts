import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateDishDTO } from '../dto/request/create-dish.dto';
import { CreateDishData } from '../types/create-dish-data';
import { UpdateDishData } from '../types/update-dish-data';
import { ReadDishData } from '../types/read-dish-data';
import { DishDTO } from '../dto/response/dish.dto';
import { UpdateDishDTO } from '../dto/request/update-dish.dto';

@Injectable()
export class DishMapper {
  constructor(private readonly sharedService: SharedService) {}

  readDataToDTO(data: ReadDishData): DishDTO {
    return new DishDTO({
      ...data,
      availability: true,
    });
  }

  dtoToCreateDishesData(
    restaurantId: string,
    dtos: CreateDishDTO[],
  ): CreateDishData[] {
    return dtos.map((dto) => {
      return new CreateDishData({
        dishId: this.sharedService.generateId(),
        restaurantId,
        ...dto,
      });
    });
  }

  dtoToCreateDishData(
    restaurantId: string,
    dto: CreateDishDTO,
  ): CreateDishData {
    return new CreateDishData({
      dishId: this.sharedService.generateId(),
      restaurantId,
      ...dto,
    });
  }

  dtoToUpdateDishData(dishId: string, dto: UpdateDishDTO): UpdateDishData {
    const udd = new UpdateDishData();
    udd.dishId = dishId;
    udd.name = dto.name;
    udd.price = dto.price;
    udd.description = dto.description;
    udd.category = dto.category;
    udd.dishImgUrl = dto.dishImgUrl;
    return udd;
  }
}
