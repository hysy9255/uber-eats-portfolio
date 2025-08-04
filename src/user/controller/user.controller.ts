import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../dto/user-input';

@Controller('users')
export class UserController {
  constructor() {}

  @Post()
  createUser(@Body() createUserInput: CreateUserInput) {
    console.log(createUserInput);
  }

  @Get()
  getUsers() {}

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    console.log(userId);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    console.log(updateUserInput);
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {
    console.log(userId);
  }
}
