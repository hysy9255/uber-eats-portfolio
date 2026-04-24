// import { UserRole } from 'src/constants/userRole';

// export class UserOutput {
//   constructor(
//     public userId: string,
//     public email: string,
//     public role: UserRole,
//   ) {}
// }

import { UserRole } from 'src/constants/userRole';

export type AuthUser =
  | {
      userId: string;
      role: UserRole.Client;
      clientId: string;
    }
  | {
      userId: string;
      role: UserRole.Owner;
      ownerId: string;
    };

export type ClientUser = {
  userId: string;
  role: UserRole.Client;
  clientId: string;
};

export type OwnerUser = {
  userId: string;
  role: UserRole.Client;
  ownerId: string;
};
