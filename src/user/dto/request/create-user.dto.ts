import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/constants/userRole';

export class CreateUserDTO {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'password' })
  @IsString()
  @MinLength(4)
  readonly password: string;

  @ApiProperty({ example: 'owner', description: 'user role' })
  @IsEnum(UserRole)
  readonly role: UserRole;

  @ApiProperty({ example: 'shawn', description: 'first name' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'yoon', description: 'last name' })
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: 'xxx-xxxx-xxxx', description: 'user phone number' })
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ example: 'url', description: 'user profile image url' })
  @IsOptional()
  @IsUrl()
  readonly profileImgUrl?: string;
}
