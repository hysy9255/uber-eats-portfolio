import { ApiProperty } from '@nestjs/swagger';
import { CreateDayHoursDTO } from './create-day-hours.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOperatingHoursDTO {
  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Mon: CreateDayHoursDTO;

  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Tue: CreateDayHoursDTO;

  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Wed: CreateDayHoursDTO;

  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Thu: CreateDayHoursDTO;

  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Fri: CreateDayHoursDTO;

  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Sat: CreateDayHoursDTO;

  @ApiProperty({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  Sun: CreateDayHoursDTO;
}
