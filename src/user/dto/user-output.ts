export enum UserRole {
  Owner = 'owner',
  Client = 'client',
  Driver = 'driver',
}

export class UserOutput {
  userId: string;
  email: string;
  role: UserRole;
}
