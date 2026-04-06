export class OrderItemDTO {
  dishImg?: string;
  name: string;
  quantity: number;
  price: number;

  constructor(init: {
    dishImg?: string;
    name: string;
    quantity: number;
    price: number;
  }) {
    this.dishImg = init.dishImg;
    this.name = init.name;
    this.quantity = init.quantity;
    this.price = init.price;
  }
}
