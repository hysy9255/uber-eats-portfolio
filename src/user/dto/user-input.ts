import {
  CreateBusinessInput,
  CreateLocationAndHoursInput,
} from 'src/restaurant/dto/restaurant-input';
import { UserRole } from './user-output';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateMenuInput } from 'src/restaurant/dto/dish-input';

export class BasicUserInfo {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '1234', description: 'password' })
  password: string;
  @ApiProperty({ example: 'owner', description: 'user role' })
  role: UserRole;
  @ApiProperty({ example: 'shawn', description: 'first name' })
  firstName: string;
  @ApiProperty({ example: 'yoon', description: 'last name' })
  lastName: string;
  @ApiProperty({ example: 'url', description: 'user profile image url' })
  profileImgUrl?: string;
}

export class CreateUserInput {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '1234', description: 'password' })
  password: string;
  @ApiProperty({ example: 'owner', description: 'user role' })
  role: UserRole;
  @ApiProperty({ example: 'shawn', description: 'user name' })
  name: string;
  @ApiProperty({ example: 'xxx-xxxx-xxxx', description: 'user phone number' })
  phoneNumber: string;
  @ApiProperty({ example: 'url', description: 'user profile image url' })
  profileImgUrl?: string;
}

export class CreateVehicleInput {
  @ApiProperty({ example: 'car', description: 'Vehicle type' })
  vehicleType: string;

  @ApiProperty({ example: 'Toyota plus', description: 'Vehicle model' })
  model: string;

  @ApiProperty({ example: '2020', description: 'Year of vehicle' })
  year: string;

  @ApiProperty({ example: 'Black', description: 'Color of the vehicle' })
  color: string;

  @ApiProperty({ example: '7ABC123', description: 'License plate' })
  licensePlate: string;
}

export class CreateDriverDocsInput {
  @ApiProperty({ example: 'license img', description: 'license' })
  license: string;

  @ApiProperty({ example: 'insurance img', description: 'insurance' })
  insurance: string;

  @ApiProperty({ example: '', description: 'Additional notes about documents' })
  additionalNotes: string;
}

export class CreateDriverInput {
  @ApiProperty({ type: CreateUserInput })
  userInfo: CreateUserInput;

  @ApiProperty({ type: CreateVehicleInput })
  vehicleInfo: CreateVehicleInput;

  @ApiProperty({ type: CreateDriverDocsInput })
  documents: CreateDriverDocsInput;
}

export class CreateOwnerInput {
  // @ApiProperty({ example: 'xxx-xxxx-xxxx', description: 'user phone number' })
  // phoneNumber: string;

  @ApiProperty({ type: CreateUserInput })
  userInfo: CreateUserInput;

  @ApiProperty({ type: CreateBusinessInput })
  business: CreateBusinessInput;

  @ApiProperty({ type: CreateLocationAndHoursInput })
  locationAndHours: CreateLocationAndHoursInput;

  @ApiProperty({ type: CreateMenuInput })
  menus: CreateMenuInput;
}

export class CreateCustomerInput extends BasicUserInfo {
  @ApiProperty({ example: 'xxx-xxxx-xxxx', description: 'user phone number' })
  phoneNumber: string;
  @ApiProperty({
    example: '123 Main St, Apt 5B, San Francisco, CA 94103',
    description: 'delivery address',
  })
  deliveryAddress: string;
  @ApiProperty({
    example: 'Leave at the front door',
    description: 'delivery notes',
  })
  deliveryNotes: string;
}

export class UpdateUserInput extends PartialType(
  PickType(CreateUserInput, ['profileImgUrl', 'phoneNumber']),
) {}

export class UpdatePasswordInput extends PickType(CreateUserInput, [
  'password',
]) {
  @ApiProperty({ example: '12345', description: 'new password' })
  newPassword: string;
}

export class DeleteUserInput extends PickType(CreateUserInput, ['password']) {}
