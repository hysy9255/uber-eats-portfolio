import { UserRole } from 'src/constants/userRole';

export class LoginResponseDTO {
  token: string;
  role: UserRole;

  constructor(init: { token: string; role: UserRole }) {
    this.token = init.token;
    this.role = init.role;
  }
}
