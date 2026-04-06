import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientExternalService } from '../service/client.external.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/constants/userRole';
import { Roles } from 'src/auth/roles.decorator';
import { GetDeliveryAddressDTO } from '../dto/get-delivery-address.dto';
import { UserOutput } from 'src/user/dto/user-output';
import { CreateDeliveryAddressDTO } from '../dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDTO } from '../dto/update-delivery-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SetDefaultDeliveryAddressDTO } from '../dto/set-default-delivery-address.dto';
import { DeleteDeliveryAddressDTO } from '../dto/delete-delivery-address.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientExternalService: ClientExternalService) {}

  @ApiOperation({ summary: 'View my delivery addresses' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/address')
  async viewMyDeliveryAddresses(
    @Req() req: Request,
  ): Promise<GetDeliveryAddressDTO[]> {
    const { userId } = req['authUser'] as UserOutput;
    return await this.clientExternalService.getDeliveryAddresses(userId);
  }

  @ApiOperation({ summary: 'Set default delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Patch('/address/default')
  async setDefaultAddress(
    @Req() req: Request,
    @Body() dto: SetDefaultDeliveryAddressDTO,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.clientExternalService.setDefaultAddress(
      userId,
      dto.deliveryAddressId,
    );
  }

  @ApiOperation({ summary: 'Add delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Post('/address')
  async addDeliveryAddress(
    @Req() req: Request,
    @Body() dto: CreateDeliveryAddressDTO,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.clientExternalService.addNewDeliveryAddress(userId, dto);
  }

  @ApiOperation({ summary: 'Update delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Patch('/address')
  async updateDeliveryAddress(
    @Req() req: Request,
    @Body() dto: UpdateDeliveryAddressDTO,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.clientExternalService.updateDeliveryAddress(userId, dto);
  }

  @ApiOperation({ summary: 'Delete delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Delete('/address')
  async deleteDeliveryAddress(
    @Req() req: Request,
    @Body() dto: DeleteDeliveryAddressDTO,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.clientExternalService.deleteDeliveryAddress(userId, dto);
  }
}
