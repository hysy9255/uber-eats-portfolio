import { Injectable } from '@nestjs/common';
import { RegisterClientDTO } from '../dto/register-client.dto';
import { RegisterOwnerDTO } from '../dto/register-owner.dto';
import { UserRegistrationService } from 'src/user/service/user.registration.service';
import { ClientOnBoardService } from 'src/client/service/client.onboard.service';
import { RegisterDriverDTO } from '../dto/register-driver.dto';
import { DriverOnBoardService } from 'src/driver/service/driver.onboard.service';
import { OwnerOnBoardService } from 'src/owner/service/owner.onboard.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly user: UserRegistrationService,
    private readonly clientOnBoard: ClientOnBoardService,
    private readonly ownerOnBoard: OwnerOnBoardService,
    private readonly driverOnBoard: DriverOnBoardService,
  ) {}

  async registerClient({ user, deliveryInfo }: RegisterClientDTO) {
    const { userId } = await this.user.create(user);
    await this.clientOnBoard.onBoard(userId, deliveryInfo);
  }

  async registerOwner({ user, restaurant }: RegisterOwnerDTO) {
    const { userId } = await this.user.create(user);
    await this.ownerOnBoard.onBoard(userId, restaurant);
  }

  async registerDriver({ user, vehicle, driverDocuments }: RegisterDriverDTO) {
    const { userId } = await this.user.create(user);
    await this.driverOnBoard.onBoard(userId, vehicle, driverDocuments);
  }
}
