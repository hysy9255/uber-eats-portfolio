import { DayOfWeek } from 'src/constants/dayOfWeek';

export class CreateOperatingHoursData {
  id: string;
  restaurantId: string;
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  open24Hours: boolean;
  closed: boolean;
}
