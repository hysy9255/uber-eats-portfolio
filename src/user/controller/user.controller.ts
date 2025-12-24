import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCustomerInput,
  CreateDriverInput,
  CreateOwnerInput,
  CreateUserInput,
  DeleteUserInput,
  UpdatePasswordInput,
  UpdateUserInput,
} from '../dto/user-input';
import { UserService } from '../service/user.service';
import { UserOutput, UserRole } from '../dto/user-output';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginInput } from '../dto/login-input';
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation, ApiParam, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { RestaurantService } from 'src/restaurant/service/restaurant.service';
import { DishService } from 'src/restaurant/service/dish.service';
import { DriverRegistration } from '../service/driver.registration';
// import { MenuInput } from 'src/restaurant/dto/dish-input';

@ApiSecurity('jwt-token')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService,
    private readonly dishService: DishService,
    private readonly driverRegistration: DriverRegistration,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  @ApiOperation({ summary: 'Check availability for account email' })
  @ApiQuery({ name: 'email', required: true, example: 'test@example.com' })
  @Get('/exists')
  async checkEmailAvailability(
    @Query('email') email: string,
  ): Promise<{ available: boolean }> {
    return await this.userService.checkEmailAvailability(email);
  }

  @ApiOperation({ summary: 'Create Customer' })
  @Post('/customers')
  async createCustomer(@Body() createCustomerInput: CreateCustomerInput) {
    const createUserInput: CreateUserInput = {
      email: createCustomerInput.email,
      password: createCustomerInput.password,
      role: createCustomerInput.role,
      name: `${createCustomerInput.firstName} ${createCustomerInput.lastName}`,
      phoneNumber: createCustomerInput.phoneNumber,
      profileImgUrl: createCustomerInput.profileImgUrl,
    };

    const userId = await this.userService.createUser(createUserInput);

    await this.userService.createClient(
      userId,
      createCustomerInput.deliveryAddress,
    );
  }

  @ApiOperation({ summary: 'Create Owner' })
  @Post('/owners')
  async createOwner(@Body() createOwnerInput: CreateOwnerInput) {
    // create user
    const createUserInput: CreateUserInput = createOwnerInput.userInfo;
    const userId = await this.userService.createUser(createUserInput);

    // create owner
    const ownerId = await this.userService.createOwner(userId);

    // create restaurant
    await this.restaurantService.createRestaurantV2(
      ownerId,
      createOwnerInput.business,
      createOwnerInput.locationAndHours,
    );

    // create menu
    const menuItems = createOwnerInput.menus.items;
    if (menuItems) {
      await this.dishService.createMenus(userId, menuItems);
    }
  }

  @ApiOperation({ summary: 'Create Driver' })
  @Post('/drivers')
  async createDriver(@Body() createDriverInput: CreateDriverInput) {
    // create user
    const createUserInput: CreateUserInput = createDriverInput.userInfo;
    const userId = await this.userService.createUser(createUserInput);
    // create owner
    const driverId = await this.userService.createDriver(userId);
    // create vehicle and documents
    await this.driverRegistration.registerVehicle(
      driverId,
      createDriverInput.vehicleInfo,
    );
    await this.driverRegistration.registerDocument(
      driverId,
      createDriverInput.documents,
    );
  }

  // @ApiOperation({ summary: 'Create user' })
  // @Post()
  // async createUser(@Body() createUserInput: CreateUserInput) {
  //   const userId = await this.userService.createUser(createUserInput);

  //   if (createUserInput.role === UserRole.Owner) {
  //     await this.userService.createOwner(userId);
  //   }
  //   if (createUserInput.role === UserRole.Client) {
  //     await this.userService.createClient(userId);
  //   }
  //   if (createUserInput.role === UserRole.Driver) {
  //     await this.userService.createDriver(userId);
  //   }
  // }

  @ApiOperation({ summary: 'Get my profile' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Get('me')
  getMe(@Req() req: Request) {
    const { userId } = req['authUser'] as UserOutput;
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: 'Change my info' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Patch('me')
  async updateMe(
    @Req() req: Request,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.userService.updateUserInfo(userId, updateUserInput);
  }

  @ApiOperation({ summary: 'Change my password' })
  @UseGuards(AuthGuard)
  @Roles(UserRole.Client, UserRole.Driver, UserRole.Owner)
  @Patch('password')
  async updateMyPassword(
    @Req() req: Request,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ) {
    const { userId } = req['authUser'] as UserOutput;
    await this.userService.updatePassword(userId, updatePasswordInput);
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
