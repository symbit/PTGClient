import { inject } from '@angular/core';

import { AuthStore } from '../state/auth.state';

export const isSuperadmin = () => {
  const state = inject(AuthStore);

  return () => state.user()?.role === 'super_admin';
};
