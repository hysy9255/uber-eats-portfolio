import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserService } from '../service/user.service';
import { UserOutput, UserRole } from '../dto/user-output';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginInput } from '../dto/login-input';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  @Post()
  async createUser(@Body() createUserInput: CreateUserInput) {
    const userId = await this.userService.createUser(createUserInput);

    if (createUserInput.role === UserRole.Owner) {
      await this.userService.createOwner(userId);
    }
    if (createUserInput.role === UserRole.Client) {
      await this.userService.createClient(userId);
    }
    if (createUserInput.role === UserRole.Driver) {
      await this.userService.createDriver(userId);
    }
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    const { userId } = req['authUser'] as UserOutput;
    return this.userService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  async updateMe(
    @Req() req: Request,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.userService.updateMe(userId, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteMe(
    @Req() req: Request,
    @Body() deleteUserInput: DeleteUserInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.userService.deleteMe(userId, deleteUserInput);
  }
}
