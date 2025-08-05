export enum UserRole {
  Owner = 'owner',
  Client = 'client',
  Driver = 'driver',
}

export class UserOutput {
  constructor(
    public userId: string,
    public email: string,
    public role: string,
  ) {}
}
