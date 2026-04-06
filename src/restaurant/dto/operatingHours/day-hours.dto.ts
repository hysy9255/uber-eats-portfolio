import { ApiProperty } from '@nestjs/swagger';

export class DayHoursDTO {
  @ApiProperty({ example: '09:00' })
  open: string;
  @ApiProperty({ example: '21:00' })
  close: string;
  @ApiProperty({ example: false })
  open24: boolean;
  @ApiProperty({ example: false })
  closed: boolean;
}
