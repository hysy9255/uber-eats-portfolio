import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { UserDTO } from './dto/response/user.dto';
import { CheckEmailAvailabilityQueryDTO } from './dto/request/check-email-availability.query.dto';
import { CheckEmailAvailabilityResponseDTO } from './dto/response/check-email-availability.response.dto';
import { UpdateUserDTO } from './dto/request/update-user.dto';
import { UpdatePasswordDTO } from './dto/request/update-password.dto';
import { DeleteUserDTO } from './dto/request/delete-user.dto';
import { AuthUser } from '../auth/types/auth-user';
import { UserService } from './service/user.service';
import { AUTH_USER } from 'src/constants/variables';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/userRole';

@ApiSecurity('jwt-token')
@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Check availability for account email' })
  @ApiQuery({ name: 'email', required: true, example: 'test@example.com' })
  @Get('/exists')
  async checkEmailAvailability(
    @Query() dto: CheckEmailAvailabilityQueryDTO,
  ): Promise<CheckEmailAvailabilityResponseDTO> {
    return await this.service.checkEmailAvailability(dto);
  }

  @ApiOperation({ summary: 'Get me' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner, UserRole.Client)
  @Get('/users/me')
  getMe(@Req() req: Request): Promise<UserDTO> {
    const { userId } = req[AUTH_USER] as AuthUser;
    return this.service.getUser(userId);
  }

  @ApiOperation({ summary: 'Update me' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner, UserRole.Client)
  @Patch('/me')
  async updateMe(@Req() req: Request, @Body() dto: UpdateUserDTO) {
    const { userId } = req[AUTH_USER] as AuthUser;
    await this.service.updateUser(userId, dto);
  }

  @ApiOperation({ summary: 'Update my password' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner, UserRole.Client)
  @Patch('/password')
  async updatePassword(@Req() req: Request, @Body() dto: UpdatePasswordDTO) {
    const { userId } = req[AUTH_USER] as AuthUser;
    await this.service.updatePassword(userId, dto);
  }

  @ApiOperation({ summary: 'Delete me' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Owner, UserRole.Client)
  @Delete('/me')
  async deleteMyAccount(@Req() req: Request, @Body() dto: DeleteUserDTO) {
    const { userId } = req[AUTH_USER] as AuthUser;
    await this.service.deleteMe(userId, dto);
  }
}
