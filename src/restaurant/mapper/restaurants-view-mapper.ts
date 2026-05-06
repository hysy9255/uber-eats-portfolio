import { Injectable } from '@nestjs/common';
import { RestaurantViewRow } from '../types/restaurant-view-row';
import { RestaurantViewDTO } from '../dto/restaurants-view.dto';
import { RestaurantGeneralInfoDTO } from '../dto/restaurantGeneralInfo/response/restaurant-general-info.dto';
import { RestaurantAddressDTO } from '../dto/restaurantAddress/response/restaurant-address.dto';
import { DayHoursDTO } from '../dto/operatingHours/response/day-hours.dto';
import { OperatingHoursDTO } from '../dto/operatingHours/response/operating-hours.dto';

type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

@Injectable()
export class RestaurantsViewMapper {
  toDTO(rows: RestaurantViewRow[]): RestaurantViewDTO[] {
    const restaurantMap = new Map<
      string,
      {
        generalInfo: RestaurantGeneralInfoDTO;
        address: RestaurantAddressDTO;
        operatingHours: Partial<Record<DayKey, DayHoursDTO>>;
      }
    >();

    for (const row of rows) {
      const existing = restaurantMap.get(row.restaurantId);

      if (!existing) {
        restaurantMap.set(row.restaurantId, {
          generalInfo: new RestaurantGeneralInfoDTO({
            restaurantId: row.restaurantId,
            logo: row.logo,
            lbn: row.lbn,
            dba: row.dba,
            cuisineType: row.cuisineType,
            storePhone: row.storePhone,
            businessEmail: row.businessEmail,
            instagram: row.instagram,
            website: row.website,
            mainImgUrl: row.mainImgUrl,
            sub1ImgUrl: row.sub1ImgUrl,
            sub2ImgUrl: row.sub2ImgUrl,
            bannerImgUrl: row.bannerImgUrl,
            deliveryRadius: row.deliveryRadius,
            prepTime: row.prepTime,
            orderType: row.orderType,
          }),

          address: new RestaurantAddressDTO({
            streetAddress: row.streetAddress,
            unit: row.unit,
            state: row.state,
            city: row.city,
            zip: row.zip,
          }),

          operatingHours: {},
        });
      }

      const restaurant = restaurantMap.get(row.restaurantId)!;

      const day = this.toDayKey(row.dayOfWeek);

      restaurant.operatingHours[day] = new DayHoursDTO({
        open: row.openTime,
        close: row.closeTime,
        open24: row.open24Hours,
        closed: row.closed,
      });
    }

    return Array.from(restaurantMap.values()).map((restaurant) => {
      return new RestaurantViewDTO({
        generalInfo: restaurant.generalInfo,
        address: restaurant.address,
        operatingHours: new OperatingHoursDTO({
          Mon: this.getDayHoursOrDefault(restaurant.operatingHours.Mon),
          Tue: this.getDayHoursOrDefault(restaurant.operatingHours.Tue),
          Wed: this.getDayHoursOrDefault(restaurant.operatingHours.Wed),
          Thu: this.getDayHoursOrDefault(restaurant.operatingHours.Thu),
          Fri: this.getDayHoursOrDefault(restaurant.operatingHours.Fri),
          Sat: this.getDayHoursOrDefault(restaurant.operatingHours.Sat),
          Sun: this.getDayHoursOrDefault(restaurant.operatingHours.Sun),
        }),
      });
    });
  }

  private toDayKey(dayOfWeek: string): DayKey {
    const normalized = dayOfWeek.toLowerCase();

    const dayMap: Record<string, DayKey> = {
      mon: 'Mon',
      monday: 'Mon',
      tue: 'Tue',
      tuesday: 'Tue',
      wed: 'Wed',
      wednesday: 'Wed',
      thu: 'Thu',
      thursday: 'Thu',
      fri: 'Fri',
      friday: 'Fri',
      sat: 'Sat',
      saturday: 'Sat',
      sun: 'Sun',
      sunday: 'Sun',
    };

    const day = dayMap[normalized];

    if (!day) {
      throw new Error(`Invalid dayOfWeek: ${dayOfWeek}`);
    }

    return day;
  }

  private getDayHoursOrDefault(dayHours?: DayHoursDTO): DayHoursDTO {
    return (
      dayHours ??
      new DayHoursDTO({
        open: '',
        close: '',
        open24: false,
        closed: true,
      })
    );
  }
}
