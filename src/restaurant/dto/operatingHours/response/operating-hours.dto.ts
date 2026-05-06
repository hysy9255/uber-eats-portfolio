import { ApiProperty } from '@nestjs/swagger';
import { DayHoursDTO } from './day-hours.dto';

export class OperatingHoursDTO {
  @ApiProperty({ type: DayHoursDTO })
  Mon: DayHoursDTO;
  @ApiProperty({ type: DayHoursDTO })
  Tue: DayHoursDTO;
  @ApiProperty({ type: DayHoursDTO })
  Wed: DayHoursDTO;
  @ApiProperty({ type: DayHoursDTO })
  Thu: DayHoursDTO;
  @ApiProperty({ type: DayHoursDTO })
  Fri: DayHoursDTO;
  @ApiProperty({ type: DayHoursDTO })
  Sat: DayHoursDTO;
  @ApiProperty({ type: DayHoursDTO })
  Sun: DayHoursDTO;

  constructor(init: {
    Mon: DayHoursDTO;
    Tue: DayHoursDTO;
    Wed: DayHoursDTO;
    Thu: DayHoursDTO;
    Fri: DayHoursDTO;
    Sat: DayHoursDTO;
    Sun: DayHoursDTO;
  }) {
    this.Mon = init.Mon;
    this.Tue = init.Tue;
    this.Wed = init.Wed;
    this.Thu = init.Thu;
    this.Fri = init.Fri;
    this.Sat = init.Sat;
    this.Sun = init.Sun;
  }
}
