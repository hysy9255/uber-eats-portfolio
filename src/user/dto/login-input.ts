import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '1234', description: 'password' })
  password: string;
}
