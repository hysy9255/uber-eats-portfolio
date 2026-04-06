import { UserRole } from 'src/constants/userRole';

export type ReadUserData = {
  userId: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phoneNumber: string;
  profileImgUrl: string;
};
