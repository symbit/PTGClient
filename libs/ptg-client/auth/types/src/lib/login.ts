import { User } from '@ptg/shared-types';

export interface Login {
  token: string;
  refreshToken?: string;
  user: User;
}
