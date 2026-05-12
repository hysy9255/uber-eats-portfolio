import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({ example: '1234', description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: '12345', description: 'new password' })
  @IsString()
  newPassword: string;
}
