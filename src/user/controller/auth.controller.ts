import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from '../dto/login-input';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
