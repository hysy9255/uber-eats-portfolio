import { Order } from 'src/order/domain/order';

export class Client {
  constructor(
    private readonly _clientId: string,
    private readonly _userId: string,
  ) {}

  static fromPersistance(clientId: string, userId: string): Client {
    return new Client(clientId, userId);
  }

  ensureOwnsOrderOf(order: Order) {
    if (this._clientId !== order.clientId) throw new Error('error');
  }

  get userId() {
    return this._userId;
  }

  get clientId() {
    return this._clientId;
  }
}
