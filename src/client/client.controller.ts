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
import { ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/constants/userRole';
import { Roles } from 'src/auth/roles.decorator';
import { GetDeliveryAddressDTO } from './dto/get-delivery-address.dto';
import { CreateDeliveryAddressDTO } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDTO } from './dto/update-delivery-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SetDefaultDeliveryAddressDTO } from './dto/set-default-delivery-address.dto';
import { DeleteDeliveryAddressDTO } from './dto/delete-delivery-address.dto';
import { ClientUser } from 'src/auth/types/auth-user';
import { ClientService } from './service/client.service';
import { AUTH_USER } from 'src/constants/variables';

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @ApiOperation({ summary: 'View my delivery addresses' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Get('/address')
  async viewMyDeliveryAddresses(
    @Req() req: Request,
  ): Promise<GetDeliveryAddressDTO[]> {
    const { clientId } = req[AUTH_USER] as ClientUser;
    return await this.service.getDeliveryAddresses(clientId);
  }

  @ApiOperation({ summary: 'Set default delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Patch('/address/default')
  async setDefaultAddress(
    @Req() req: Request,
    @Body() dto: SetDefaultDeliveryAddressDTO,
  ) {
    const { clientId } = req[AUTH_USER] as ClientUser;
    await this.service.setDefaultAddress(clientId, dto.deliveryAddressId);
  }

  @ApiOperation({ summary: 'Add delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Post('/address')
  async addDeliveryAddress(
    @Req() req: Request,
    @Body() dto: CreateDeliveryAddressDTO,
  ) {
    const { clientId } = req[AUTH_USER] as ClientUser;
    await this.service.addNewDeliveryAddress(clientId, dto);
  }

  @ApiOperation({ summary: 'Update delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Patch('/address')
  async updateDeliveryAddress(
    @Req() req: Request,
    @Body() dto: UpdateDeliveryAddressDTO,
  ) {
    const { clientId } = req[AUTH_USER] as ClientUser;
    await this.service.updateDeliveryAddress(clientId, dto);
  }

  @ApiOperation({ summary: 'Delete delivery address' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client)
  @Delete('/address')
  async deleteDeliveryAddress(
    @Req() req: Request,
    @Body() dto: DeleteDeliveryAddressDTO,
  ) {
    const { clientId } = req[AUTH_USER] as ClientUser;
    await this.service.deleteDeliveryAddress(clientId, dto);
  }
}
