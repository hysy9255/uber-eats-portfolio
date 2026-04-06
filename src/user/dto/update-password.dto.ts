import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
  @ApiProperty({ example: '1234', description: 'password' })
  password: string;

  @ApiProperty({ example: '12345', description: 'new password' })
  newPassword: string;
}
