export class Client {
  constructor(
    private readonly _clientId: string,
    private readonly _userId: string,
  ) {}

  static fromPersistance(clientId: string, userId: string): Client {
    return new Client(clientId, userId);
  }

  get userId() {
    return this._userId;
  }

  get clientId() {
    return this._clientId;
  }
}
