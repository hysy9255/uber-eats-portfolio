export class CreateDishData {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  dishImgUrl?: string;

  constructor(init: {
    dishId: string;
    restaurantId: string;
    name: string;
    price: number;
    description: string;
    category: string;
    dishImgUrl?: string;
  }) {
    this.dishId = init.dishId;
    this.restaurantId = init.restaurantId;
    this.name = init.name;
    this.price = init.price;
    this.description = init.description;
    this.category = init.category;
    this.dishImgUrl = init.dishImgUrl;
  }
}
