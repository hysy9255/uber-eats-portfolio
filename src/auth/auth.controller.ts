import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LoginRequestDTO } from 'src/auth/dto/login.request.dto';
import { LoginResponseDTO } from 'src/auth/dto/login.response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiResponse({ type: LoginResponseDTO })
  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    console.log('dto', dto);
    return this.service.login(dto);
  }
}
