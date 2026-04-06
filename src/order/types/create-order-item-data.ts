export class CreateOrderItemData {
  orderItemId: string;
  orderId: string;
  dishId: string;
  quantity: number;

  constructor(init: {
    orderItemId: string;
    orderId: string;
    dishId: string;
    quantity: number;
  }) {
    this.orderItemId = init.orderItemId;
    this.orderId = init.orderId;
    this.dishId = init.dishId;
    this.quantity = init.quantity;
  }
}
