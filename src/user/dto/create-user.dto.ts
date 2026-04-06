import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/constants/userRole';

export class CreateUserDTO {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  readonly email: string;
  @ApiProperty({ example: '1234', description: 'password' })
  readonly password: string;
  @ApiProperty({ example: 'owner', description: 'user role' })
  readonly role: UserRole;
  @ApiProperty({ example: 'shawn', description: 'first name' })
  readonly firstName: string;
  @ApiProperty({ example: 'yoon', description: 'last name' })
  readonly lastName: string;
  @ApiProperty({ example: 'xxx-xxxx-xxxx', description: 'user phone number' })
  readonly phoneNumber: string;
  @ApiProperty({ example: 'url', description: 'user profile image url' })
  readonly profileImgUrl?: string;
}
