export class GetRestaurantNameAndLogoDTO {
  restaurantName: string;
  restaurantLogo?: string;

  constructor(init: { restaurantName: string; restaurantLogo?: string }) {
    this.restaurantName = init.restaurantName;
    this.restaurantLogo = init.restaurantLogo;
  }
}
