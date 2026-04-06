import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterClientDTO } from './dto/register-client.dto';
import { RegistrationExternalService } from './registration.external.service';
import { RegisterOwnerDTO } from './dto/register-owner.dto';
import { RegisterDriverDTO } from './dto/register-driver.dto';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationExternalService: RegistrationExternalService,
  ) {}

  @ApiOperation({ summary: 'Register Client' })
  @Post('/clients')
  async registerClient(@Body() dto: RegisterClientDTO) {
    await this.registrationExternalService.registerClient(dto);
  }

  // done
  @ApiOperation({ summary: 'Register Owner' })
  @Post('/owners')
  async registerOwner(@Body() dto: RegisterOwnerDTO) {
    await this.registrationExternalService.registerOwner(dto);
  }

  // done
  @ApiOperation({ summary: 'Register Driver' })
  @Post('/drivers')
  async registerDriver(@Body() dto: RegisterDriverDTO) {
    await this.registrationExternalService.registerDriver(dto);
  }
}
