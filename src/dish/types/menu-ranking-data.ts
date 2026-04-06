export type QuantityAndDishName = {
  dishId: string;
  quantity: number;
  dishName: string;
};

export type MenuRankingDTO = {
  topOrders: QuantityAndDishName[];
  leastOrders: QuantityAndDishName[];
};
