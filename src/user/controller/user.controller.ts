import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserInput: CreateUserInput) {
    this.userService.createUser(createUserInput);
  }

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Get('me')
  getMe() {
    this.userService.getMe();
  }

  @Patch('me')
  updateMe(@Body() updateUserInput: UpdateUserInput) {
    this.userService.updateMe(updateUserInput);
  }

  @Delete('me')
  deleteMe(@Body() deleteUserInput: DeleteUserInput) {
    console.log(deleteUserInput);
  }
}
