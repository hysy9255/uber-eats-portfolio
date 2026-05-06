import { UserRole } from 'src/constants/userRole';

export class UpdateUserData {
  userId: string;
  email?: string;
  password?: string;
  role?: UserRole;
  name?: string;
  phoneNumber?: string;
  profileImgUrl?: string;

  constructor(init: {
    userId: string;
    email?: string;
    password?: string;
    role?: UserRole;
    name?: string;
    phoneNumber?: string;
    profileImgUrl?: string;
  }) {
    this.userId = init.userId;
    this.email = init.email;
    this.password = init.password;
    this.role = init.role;
    this.name = init.name;
    this.phoneNumber = init.phoneNumber;
    this.profileImgUrl = init.profileImgUrl;
  }
}
