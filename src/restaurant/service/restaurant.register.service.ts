import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { CreateRestaurantDTO } from '../dto/restaurant/create-restaurant.dto';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { OperatingHoursMapper } from '../mapper/operating-hours.mapper';
import { RestaurantAddressRepository } from '../repository/restaurant-address.repository';
import { RestaurantAddressMapper } from '../mapper/restaurant-address.mapper';
import { OperatingHoursRepository } from '../repository/operating-hours.repository';

@Injectable()
export class RestaurantRegisterService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly restaruantMapper: RestaurantMapper,
    private readonly addressRepo: RestaurantAddressRepository,
    private readonly addressMapper: RestaurantAddressMapper,
    private readonly hoursRepo: OperatingHoursRepository,
    private readonly hoursMapper: OperatingHoursMapper,
  ) {}

  async register(
    ownerId: string,
    dto: CreateRestaurantDTO,
  ): Promise<{ restaurantId: string }> {
    const { generalInfo: info, operatingHours: hours, address } = dto;
    const createRestaurantData = this.restaruantMapper.dtoToCreateData(
      ownerId,
      info,
    );
    const { restaurantId: id } = createRestaurantData;
    const cohData = this.hoursMapper.dtoToCreateData(id, hours);
    const createAddressData = this.addressMapper.dtoToCreateData(id, address);

    await this.restaurantRepo.save(createRestaurantData);
    await this.hoursRepo.save(cohData);
    await this.addressRepo.save(createAddressData);
    return { restaurantId: id };
  }
}
