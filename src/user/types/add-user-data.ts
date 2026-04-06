import { UserRole } from 'src/constants/userRole';

export class AddUserData {
  userId: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  profileImgUrl?: string;
}
