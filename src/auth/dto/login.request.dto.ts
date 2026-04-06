import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDTO {
  @ApiProperty({ example: 'owner@gmail.com', description: 'email' })
  readonly email: string;
  @ApiProperty({ example: '1234', description: 'password' })
  readonly password: string;
}
