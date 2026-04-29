export class GetRestaurantNameAndLogoDTO {
  restaurantName: string;
  restaurantLogo: string | null;

  constructor(init: { restaurantName: string; restaurantLogo: string | null }) {
    this.restaurantName = init.restaurantName;
    this.restaurantLogo = init.restaurantLogo;
  }
}
