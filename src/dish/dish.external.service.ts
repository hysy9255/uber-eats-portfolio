import { Injectable, NotFoundException } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { GetDishPageDTO } from './dto/get-dish-page.dto';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishMapper } from './dish.mapper';
import { DishDTO } from './dto/dish.dto';
import { DishValidationService } from './dish.validation.service';
import { RestaurantRepository } from 'src/restaurant/repository/restaurant.repository';
import { DishDTOAssembler } from './assembler/dish-dto.assembler';

@Injectable()
export class DishExternalService {
  constructor(
    private readonly dishMapper: DishMapper,
    private readonly dish: DishRepository,
    private readonly restaurant: RestaurantRepository,
    private readonly validation: DishValidationService,
    private readonly assembler: DishDTOAssembler,
  ) {}

  // done
  async getDishes(restaurantId: string): Promise<DishDTO[]> {
    const dishes = await this.dish.findByRestaurant(restaurantId);
    return dishes.map((dish) => {
      return this.dishMapper.readDataToDTO(dish);
    });
  }

  // done
  async getDishPage(dishId: string): Promise<GetDishPageDTO> {
    try {
      const dish = await this.dish.findOneById(dishId);
      const restaurantId = dish.restaurantId;

      const restaurant = await this.restaurant.findOneById(restaurantId);
      const dishes = await this.dish.findByRestaurant(restaurantId);

      return this.assembler.buildDishPage(dish, dishes, restaurant);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Dish Page Not Found');
    }
  }

  // done
  async createDish(ownerId: string, dto: CreateDishDTO) {
    const { restaurantId } = await this.restaurant.findOneByOwner(ownerId);
    await this.dish.save(
      this.dishMapper.dtoToCreateDishData(restaurantId, dto),
    );
  }

  // done
  async updateDish(ownerId: string, dishId: string, dto: UpdateDishDTO) {
    await this.validation.updateDish(ownerId, dishId);
    const updateDishData = this.dishMapper.dtoToUpdateDishData(dishId, dto);
    await this.dish.update(updateDishData);
  }

  // done
  async deleteDish(ownerId: string, dishId: string) {
    await this.validation.deleteDish(ownerId, dishId);
    await this.dish.delete(dishId);
  }
}
