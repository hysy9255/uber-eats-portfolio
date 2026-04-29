export class Restaurant {
  constructor(
    private readonly restaurantId: string,
    private readonly dishIds: string[],
  ) {}

  isOpen() {
    return true;
  }

  ensureDishExist(dishIds: string[]) {
    const missingDishIds = dishIds.filter((id) => !this.dishIds.includes(id));
    if (missingDishIds.length > 0) {
      throw new Error(
        `Dishes with IDs ${missingDishIds.join(', ')} do not exist in the restaurant`,
      );
    }
  }
}
