import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateOperatingHoursData } from '../types/operating-hours/create-operating-hours-data';
import { UpdateOperatingHoursDTO } from '../dto/operatingHours/request/update-operating-hours.dto';
import { UpdateOperatingHoursData } from '../types/operating-hours/update-operating-hours-data';
import { DayOfWeek } from 'src/constants/dayOfWeek';
import { ReadOperatingHoursData } from '../types/operating-hours/read-operating-hours-data';
import { DayHoursDTO } from '../dto/operatingHours/response/day-hours.dto';
import { OperatingHoursDTO } from '../dto/operatingHours/response/operating-hours.dto';
import { CreateOperatingHoursDTO } from '../dto/operatingHours/request/create-operating-hours.dto';

@Injectable()
export class OperatingHoursMapper {
  constructor(private readonly sharedService: SharedService) {}

  dtoToCreateData(
    restuarnatId: string,
    dto: CreateOperatingHoursDTO,
  ): CreateOperatingHoursData[] {
    return Object.keys(dto).map((day) => {
      const cod = new CreateOperatingHoursData();
      cod.id = this.sharedService.generateId();
      cod.restaurantId = restuarnatId;
      cod.dayOfWeek = DayOfWeek[`${day}`];
      cod.openTime = dto[`${day}`].open;
      cod.closeTime = dto[`${day}`].close;
      cod.open24Hours = dto[`${day}`].open24;
      cod.closed = dto[`${day}`].closed;
      return cod;
    });
  }

  dtoToUpdateData(
    restuarnatId: string,
    operatingHoursIdsAndDays: { id: string; dayOfWeek: DayOfWeek }[],
    dto: UpdateOperatingHoursDTO,
  ): UpdateOperatingHoursData[] {
    return Object.keys(dto).map((day) => {
      const cod = new UpdateOperatingHoursData();
      cod.id = operatingHoursIdsAndDays.find(
        (od) => od.dayOfWeek === DayOfWeek[`${day}`],
      )!.id;
      cod.restaurantId = restuarnatId;
      cod.dayOfWeek = DayOfWeek[`${day}`];
      cod.openTime = dto[`${day}`].open;
      cod.closeTime = dto[`${day}`].close;
      cod.open24Hours = dto[`${day}`].open24;
      cod.closed = dto[`${day}`].closed;
      return cod;
    });
  }

  toDayHoursDTO = (row: ReadOperatingHoursData): DayHoursDTO => {
    // ✅ 데이터 없을 때 정책: closed=true 등
    return {
      open: row.openTime,
      close: row.closeTime,
      open24: row.open24Hours,
      closed: row.closed,
    };
  };

  readDataToDTO(data: ReadOperatingHoursData[]): OperatingHoursDTO {
    const byDay = new Map(data.map((d) => [d.dayOfWeek, d] as const));
    return new OperatingHoursDTO({
      Mon: this.toDayHoursDTO(byDay.get(DayOfWeek.Mon)!),
      Tue: this.toDayHoursDTO(byDay.get(DayOfWeek.Tue)!),
      Wed: this.toDayHoursDTO(byDay.get(DayOfWeek.Wed)!),
      Thu: this.toDayHoursDTO(byDay.get(DayOfWeek.Thu)!),
      Fri: this.toDayHoursDTO(byDay.get(DayOfWeek.Fri)!),
      Sat: this.toDayHoursDTO(byDay.get(DayOfWeek.Sat)!),
      Sun: this.toDayHoursDTO(byDay.get(DayOfWeek.Sun)!),
    });
  }
}
