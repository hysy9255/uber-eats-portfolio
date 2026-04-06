import { UserRole } from 'src/constants/userRole';

export class UserOutput {
  constructor(
    public userId: string,
    public email: string,
    public role: UserRole,
  ) {}
}
