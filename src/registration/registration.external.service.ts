import { Injectable } from '@nestjs/common';
import { RegisterClientDTO } from './dto/register-client.dto';
import { ClientInternalService } from 'src/client/service/client.internal.service';
import { DriverInternalService } from 'src/driver/driver.internal.service';
import { RegisterOwnerDTO } from './dto/register-owner.dto';
import { RestaurantInternalService } from 'src/restaurant/service/restaurant.internal.service';
import { OwnerInternalService } from 'src/owner/owner.internal.service';
import { RegisterDriverDTO } from './dto/register-driver.dto';
import { UserInternalService } from 'src/user/service/user.internal.service';
import { DishInternalService } from 'src/dish/dish.internal.service';

@Injectable()
export class RegistrationExternalService {
  constructor(
    private readonly userInternalService: UserInternalService,
    private readonly clientInternalService: ClientInternalService,
    private readonly ownerInternalService: OwnerInternalService,
    private readonly driverInternalService: DriverInternalService,
    private readonly restaurantInternalService: RestaurantInternalService,
    private readonly dishInternalService: DishInternalService,
  ) {}

  async registerClient(dto: RegisterClientDTO) {
    const { userId } = await this.userInternalService.create(dto.user);
    const { clientId } = await this.clientInternalService.createClient(userId);
    await this.clientInternalService.createDeliveryAddress(
      clientId,
      dto.deliveryInfo,
    );
  }

  async registerDriver(dto: RegisterDriverDTO) {
    const { userId } = await this.userInternalService.create(dto.user);
    const { driverId } = await this.driverInternalService.create(userId);
    await this.driverInternalService.registerVehicle(driverId, dto.vehicle);
    await this.driverInternalService.registerDocument(
      driverId,
      dto.driverDocuments,
    );
  }

  // done
  async registerOwner(dto: RegisterOwnerDTO) {
    const { userId } = await this.userInternalService.create(dto.user);
    const { ownerId } = await this.ownerInternalService.create(userId);

    const { restaurantId } = await this.restaurantInternalService.create(
      ownerId,
      dto.restaurant.restaurantSummary,
    );

    if (dto.restaurant.dishes) {
      await this.dishInternalService.createMany(
        restaurantId,
        dto.restaurant.dishes,
      );
    }
  }
}
