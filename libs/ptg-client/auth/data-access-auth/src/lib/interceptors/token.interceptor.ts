import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthStore } from '../state/auth.state';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const state = inject(AuthStore);
  const accessToken = state.accessToken() || '';

  request = request.url.includes('/auth/me')
    ? request
    : request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if ([401, 403].includes(err.status)) {
        // Handle auth errors globally
        state.logout();
      }

      // Re-throw the original error to preserve full error details
      return throwError(() => err);
    }),
  );
};
