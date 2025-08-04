import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from '../dto/login-input';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  login(@Body() loginInput: LoginInput) {
    console.log(loginInput);
  }
}
