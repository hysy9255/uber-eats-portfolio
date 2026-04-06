import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthExternalService } from './auth.external.service';
import { LoginRequestDTO } from 'src/auth/dto/login.request.dto';
import { LoginResponseDTO } from 'src/auth/dto/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authExternalService: AuthExternalService) {}

  // done
  @ApiResponse({ type: LoginResponseDTO })
  @ApiOperation({ summary: 'Check availability for account email' })
  @Post('login')
  async login(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.authExternalService.login(dto);
  }
}
