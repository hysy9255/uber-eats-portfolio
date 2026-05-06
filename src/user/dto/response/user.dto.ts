import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/constants/userRole';

export class UserDTO {
  @ApiProperty({ example: 'xxx', description: 'user uuid' })
  userId: string;

  @ApiProperty({ example: 'Client', description: 'user role' })
  role: UserRole;

  @ApiProperty({ example: 'xxx@xx.com', description: 'user email' })
  email: string;

  @ApiProperty({ example: 'shawn', description: 'user name' })
  name: string;

  @ApiProperty({ example: 'xxx-xxx-xxxx', description: 'user phone number' })
  phoneNumber: string;

  @ApiPropertyOptional({
    example: 'xxx.com',
    description: 'user profile img url',
    nullable: true,
  })
  profileImgUrl: string | null;

  constructor(init: {
    userId: string;
    role: UserRole;
    email: string;
    name: string;
    phoneNumber: string;
    profileImgUrl: string | null;
  }) {
    this.userId = init.userId;
    this.role = init.role;
    this.email = init.email;
    this.name = init.name;
    this.phoneNumber = init.phoneNumber;
    this.profileImgUrl = init.profileImgUrl;
  }
}
