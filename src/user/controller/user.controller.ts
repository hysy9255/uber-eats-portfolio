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
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation, ApiParam, ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('jwt-token')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  @ApiOperation({ summary: 'Create user' })
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

  @ApiOperation({ summary: 'Get my profile' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Get('me')
  getMe(@Req() req: Request) {
    const { userId } = req['authUser'] as UserOutput;
    console.log(userId);
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: 'Change my password' })
  @UseGuards(AuthGuard)
  @Patch('me')
  async updateMe(
    @Req() req: Request,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.userService.updateMe(userId, updateUserInput);
  }

  @ApiOperation({ summary: 'Delete my account' })
  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteMe(
    @Req() req: Request,
    @Body() deleteUserInput: DeleteUserInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.userService.deleteMe(userId, deleteUserInput);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    required: true,
    type: String,
    example: '64f1a2b7c9d1234567890abc',
  })
  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }
}
