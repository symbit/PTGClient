import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthStore } from '../state/auth.state';
import { AuthService } from '../service/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export function authGuard(
  route: ActivatedRouteSnapshot,
): Observable<boolean> | boolean {
  const state = inject(AuthStore);
  const authService = inject(AuthService);
  const router = inject(Router);

  const loginWithToken = !!route.queryParamMap.get('token');
  const token = state.accessToken() || route.queryParamMap.get('token');

  if (loginWithToken) {
    return authService.loginWithToken(token || '').pipe(
      map((res) => {
        state.loginWithToken(res);
        return true;
      }),
      catchError(() => of(false)),
    );
  }

  if (!token) router.navigate(['/auth/login']);

  return !!token;
}
