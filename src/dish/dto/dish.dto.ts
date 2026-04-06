export class DishDTO {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl?: string;
  availability: boolean;
  constructor(init: {
    dishId: string;
    restaurantId: string;
    name: string;
    price: number;
    description: string;
    category: string;
    availability: boolean;
    dishImgUrl?: string;
  }) {
    this.dishId = init.dishId;
    this.restaurantId = init.restaurantId;
    this.name = init.name;
    this.price = init.price;
    this.description = init.description;
    this.category = init.category;
    this.availability = init.availability;
    this.dishImgUrl = init.dishImgUrl;
  }
}
