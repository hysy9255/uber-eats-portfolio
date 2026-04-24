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
import { UserExternalService } from '../service/user.external.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { UserDTO } from '../dto/user.dto';
import { CheckEmailAvailabilityQueryDTO } from '../dto/availability/check-email-availability.query.dto';
import { CheckEmailAvailabilityResponseDTO } from '../dto/availability/check-email-availability.response.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UpdatePasswordDTO } from '../dto/update-password.dto';
import { DeleteUserDTO } from '../dto/delete-user.dto';
import { UserRole } from 'src/constants/userRole';
import { AuthUser } from '../types/auth-user';
console.log('### USER CONTROLLER LOADED ###');

@ApiSecurity('jwt-token')
@Controller()
export class UserController {
  constructor(private readonly userService: UserExternalService) {}

  // done
  @ApiOperation({ summary: 'Check availability for account email' })
  @ApiQuery({ name: 'email', required: true, example: 'test@example.com' })
  @Get('/exists')
  async checkEmailAvailability(
    @Query() dto: CheckEmailAvailabilityQueryDTO,
  ): Promise<CheckEmailAvailabilityResponseDTO> {
    return await this.userService.checkEmailAvailability(dto);
  }

  // done
  @ApiOperation({ summary: 'Get me' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Get('/users/me')
  getMe(@Req() req: Request): Promise<UserDTO> {
    const { userId } = req['authUser'] as AuthUser;
    return this.userService.getUser(userId);
  }

  // done
  @ApiOperation({ summary: 'Update me' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Patch('/me')
  async updateMe(@Req() req: Request, @Body() dto: UpdateUserDTO) {
    const { userId } = req['authUser'] as AuthUser;
    await this.userService.updateUser(userId, dto);
  }

  // done
  @ApiOperation({ summary: 'Update my password' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Patch('/password')
  async updatePassword(@Req() req: Request, @Body() dto: UpdatePasswordDTO) {
    const { userId } = req['authUser'] as AuthUser;
    await this.userService.updatePassword(userId, dto);
  }

  // done
  @ApiOperation({ summary: 'Delete me' })
  @UseGuards(AuthGuard)
  @Delete('/me')
  async deleteMyAccount(@Req() req: Request, @Body() dto: DeleteUserDTO) {
    const { userId } = req['authUser'] as AuthUser;
    await this.userService.deleteMe(userId, dto);
  }
}
