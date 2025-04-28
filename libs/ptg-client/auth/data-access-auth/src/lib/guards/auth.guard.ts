import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from '../state/auth.state';

export function authGuard(): boolean {
  const state = inject(AuthStore);
  const router = inject(Router);

  const token = state.accessToken();

  if (!token) router.navigate(['/login']);

  return !!token;
}
