import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateDayHoursDTO } from './create-day-hours.dto';

export class UpdateOperatingHoursDTO {
  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Mon?: CreateDayHoursDTO;

  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Tue?: CreateDayHoursDTO;

  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Wed?: CreateDayHoursDTO;

  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Thu?: CreateDayHoursDTO;

  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Fri?: CreateDayHoursDTO;

  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Sat?: CreateDayHoursDTO;

  @ApiPropertyOptional({ type: CreateDayHoursDTO })
  @ValidateNested()
  @Type(() => CreateDayHoursDTO)
  @IsOptional()
  Sun?: CreateDayHoursDTO;
}
