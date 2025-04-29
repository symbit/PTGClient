export type UserRole = 'super_admin' | 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: UserRole;
  isInvited?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
}
