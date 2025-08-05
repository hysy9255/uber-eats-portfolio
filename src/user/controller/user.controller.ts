import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
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
  async createUser(@Body() createUserInput: CreateUserInput) {
    await this.userService.createUser(createUserInput);
  }

  @Get('me')
  getMe(@Req() req: Request) {
    return this.userService.getUser(req['userId'] as string);
  }

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
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
