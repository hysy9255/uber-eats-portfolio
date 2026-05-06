import { ApiProperty } from '@nestjs/swagger';

export class DayHoursDTO {
  @ApiProperty({ example: '09:00' })
  readonly open: string | null;

  @ApiProperty({ example: '21:00' })
  readonly close: string | null;

  @ApiProperty({ example: false })
  readonly open24: boolean;

  @ApiProperty({ example: false })
  readonly closed: boolean;

  constructor(init: {
    open: string | null;
    close: string | null;
    open24: boolean;
    closed: boolean;
  }) {
    this.open = init.open;
    this.close = init.close;
    this.open24 = init.open24;
    this.closed = init.closed;
  }
}
