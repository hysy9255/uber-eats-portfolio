import { Injectable } from '@nestjs/common';
import { UpdateRestaurantDTO } from '../dto/update-restaurant.dto';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { OperatingHoursRepository } from '../repository/operating-hours.repository';
import { RestaurantAddressRepository } from '../repository/restaurant-address.repository';
import { RestaurantMapper } from '../mapper/restaurant.mapper';
import { RestaurantAddressMapper } from '../mapper/restaurant-address.mapper';
import { OperatingHoursMapper } from '../mapper/operating-hours.mapper';
import { RestaurantLoader } from './restaurant.loader';

@Injectable()
export class RestaurantCommandService {
  constructor(
    private readonly restaurantRepo: RestaurantRepository,
    private readonly hoursRepo: OperatingHoursRepository,
    private readonly addressRepo: RestaurantAddressRepository,

    private readonly restaurantMapper: RestaurantMapper,
    private readonly addressMapper: RestaurantAddressMapper,
    private readonly hoursMapper: OperatingHoursMapper,

    private readonly restaurantLoader: RestaurantLoader,
  ) {}

  async updateRestaurant2(ownerId: string, dto: UpdateRestaurantDTO) {
    const restaurant = await this.restaurantLoader.load(ownerId);
    console.log(restaurant);
    console.log(dto);
  }

  async updateRestaurant(ownerId: string, dto: UpdateRestaurantDTO) {
    const { restaurantId } = await this.restaurantRepo.findOneByOwner(ownerId);

    if (dto.generalInfo) {
      const updateRestaurantInfoData = this.restaurantMapper.dtoToUpdateData(
        restaurantId,
        dto.generalInfo,
      );
      await this.restaurantRepo.update(updateRestaurantInfoData);
    }

    if (dto.operatingHours) {
      const operatingHoursIdsAndDays =
        await this.hoursRepo.findIdsAndDaysByRestaurantId(restaurantId);
      const updateOperatingHoursData = this.hoursMapper.dtoToUpdateData(
        restaurantId,
        operatingHoursIdsAndDays,
        dto.operatingHours,
      );
      await this.hoursRepo.update(updateOperatingHoursData);
    }

    if (dto.address) {
      const { restaurantAddressId } =
        await this.addressRepo.findOneByRestaurant(restaurantId);
      const updateAddressData = this.addressMapper.dtoToUpdateData(
        restaurantId,
        restaurantAddressId,
        dto.address,
      );
      await this.addressRepo.update(updateAddressData);
    }
  }
}
