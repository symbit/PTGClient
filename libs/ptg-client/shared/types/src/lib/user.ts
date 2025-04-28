export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: string;
  isInvited?: boolean;
  isActive?: boolean;
}
