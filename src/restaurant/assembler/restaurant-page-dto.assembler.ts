import { Injectable } from '@nestjs/common';
import { GetRestaurantPageViewDTO } from '../dto/get-restaurant-page-view.dto';
import { ReadRestaurantData } from '../types/read-restaurant-data';
import { ReadRestaurantAddressData } from '../types/read-restaurant-address-data';
import { ReadOperatingHoursData } from '../types/read-operating-hours-data';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { RestaurantAddressMapper } from '../mapper/restaurant-address.mapper';
import { OperatingHoursMapper } from '../mapper/operating-hours.mapper';
import { ReadDishData } from 'src/dish/types/read-dish-data';
import { DishMapper } from 'src/dish/dish.mapper';
import { GetRestaurantsPageViewDTO } from '../dto/get-restaurants-page-view.dto';

@Injectable()
export class RestaurantPageDTOAssembler {
  constructor(
    private readonly restaurantMapper: RestaurantMapper,
    private readonly addressMapper: RestaurantAddressMapper,
    private readonly hoursMapper: OperatingHoursMapper,
    private readonly dishMapper: DishMapper,
  ) {}

  build(
    restaurant: ReadRestaurantData,
    hours: ReadOperatingHoursData[],
    address: ReadRestaurantAddressData,
    dishes: ReadDishData[],
  ): GetRestaurantPageViewDTO {
    const response = new GetRestaurantPageViewDTO();
    response.restaurantSummary = {
      generalInfo: this.restaurantMapper.readDataToDTO(restaurant),
      address: this.addressMapper.readDataToDTO(address),
      operatingHours: this.hoursMapper.readDataToDTO(hours),
    };
    response.dishes = dishes.map((dish) => this.dishMapper.readDataToDTO(dish));
    return response;
  }

  buildMany(
    restaurants: ReadRestaurantData[],
    hours: ReadOperatingHoursData[],
    addresses: ReadRestaurantAddressData[],
  ): GetRestaurantsPageViewDTO {
    const restaurantIds = restaurants.map((r) => r.restaurantId);

    const hoursMap = new Map<string, ReadOperatingHoursData[]>();
    for (const h of hours) {
      const list = hoursMap.get(h.restaurantId);
      if (list) {
        list.push(h);
      } else {
        hoursMap.set(h.restaurantId, [h]);
      }
    }

    const response = new GetRestaurantsPageViewDTO();
    response.restaurantSummaries = [];

    for (const id of restaurantIds) {
      const restaurant = restaurants.find((r) => r.restaurantId === id);
      const address = addresses.find((a) => a.restaurantId === id);
      const operatingHours = hoursMap.get(id);

      response.restaurantSummaries.push({
        generalInfo: this.restaurantMapper.readDataToDTO(restaurant!),
        address: this.addressMapper.readDataToDTO(address!),
        operatingHours: this.hoursMapper.readDataToDTO(operatingHours!),
      });
    }
    return response;
  }
}
