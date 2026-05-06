import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterClientDTO } from './dto/register-client.dto';
import { RegisterOwnerDTO } from './dto/register-owner.dto';
import { RegisterDriverDTO } from './dto/register-driver.dto';
import { RegistrationService } from './service/registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrar: RegistrationService) {}

  @ApiOperation({ summary: 'Register Client' })
  @Post('/clients')
  async registerClient(@Body() dto: RegisterClientDTO) {
    await this.registrar.registerClient(dto);
  }

  @ApiOperation({ summary: 'Register Owner' })
  @Post('/owners')
  async registerOwner(@Body() dto: RegisterOwnerDTO) {
    await this.registrar.registerOwner(dto);
  }

  @ApiOperation({ summary: 'Register Driver' })
  @Post('/drivers')
  async registerDriver(@Body() dto: RegisterDriverDTO) {
    await this.registrar.registerDriver(dto);
  }
}
