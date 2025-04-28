import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthStore } from '../state/auth.state';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const state = inject(AuthStore);
  const accessToken = state.accessToken() || '';

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(request).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        state.logout();
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    }),
  );
};
