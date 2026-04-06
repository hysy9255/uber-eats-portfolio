import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDTO {
  @ApiProperty({ example: '1234', description: 'password' })
  password: string;
}
