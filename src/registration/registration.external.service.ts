import { Injectable } from '@nestjs/common';
import { RegisterClientDTO } from './dto/register-client.dto';
import { RegisterOwnerDTO } from './dto/register-owner.dto';
import { RegisterDriverDTO } from './dto/register-driver.dto';
import { UserInternalService } from 'src/user/service/user.internal.service';
import { ClientOnBoardService } from 'src/client/service/client.onboard.service';
import { DriverOnBoardService } from 'src/driver/driver.onboard.service';
import { OwnerOnBoardService } from 'src/owner/owner.onboard.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly user: UserInternalService,
    private readonly clientOnBoard: ClientOnBoardService,
    private readonly driverOnBoard: DriverOnBoardService,
    private readonly ownerOnBoard: OwnerOnBoardService,
  ) {}

  async registerClient({ user, deliveryInfo }: RegisterClientDTO) {
    const { userId } = await this.user.create(user);
    await this.clientOnBoard.onBoard(userId, deliveryInfo);
  }

  async registerDriver({ user, vehicle, driverDocuments }: RegisterDriverDTO) {
    const { userId } = await this.user.create(user);
    await this.driverOnBoard.onBoard(userId, vehicle, driverDocuments);
  }

  async registerOwner({ user, restaurant }: RegisterOwnerDTO) {
    const { userId } = await this.user.create(user);
    await this.ownerOnBoard.onBoard(userId, restaurant);
  }
}
