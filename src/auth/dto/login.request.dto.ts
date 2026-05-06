import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'password' })
  @IsString()
  readonly password: string;
}
