import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { pipe, switchMap, tap } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import { User } from '@ptg/shared-types';
import { Login } from '@ptg/auth-types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withDevtools('auth'),
  withState(initialState),
  withCallState('auth state'),
  withStorageSync({
    key: 'auth',
  }),
  withMethods((store) => {
    const authService = inject(AuthService);
    const toastrService = inject(ToastrService);
    const router = inject(Router);

    return {
      login: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() =>
            patchState(store, {
              authStateCallState: LoadingState.LOADING,
            }),
          ),
          switchMap(({ email, password }) =>
            authService.login(email, password).pipe(
              tapResponse({
                next: (res) => {
                  patchState(store, {
                    user: res.user,
                    accessToken: res.token,
                    refreshToken: res.refreshToken,
                    authStateCallState: LoadingState.LOADED,
                  });
                  router.navigate(['/dashboard']);
                },
                error: (error) => {
                  toastrService.error('Nieprawidłowe dane logowania');
                  patchState(store, {
                    authStateCallState: { error },
                  });
                },
              }),
            ),
          ),
        ),
      ),
      loginWithToken: (res: Login) => {
        patchState(store, {
          user: res.user,
          accessToken: res.token,
          refreshToken: res.refreshToken,
        });
      },
      confirmInvitation: rxMethod<{ token: string; password: string }>(
        pipe(
          tap(() =>
            patchState(store, {
              authStateCallState: LoadingState.LOADING,
            }),
          ),
          switchMap(({ token, password }) =>
            authService.confirmInvitation(token, password).pipe(
              tapResponse({
                next: () => {
                  router.navigate(['/auth/login']);
                },
                error: (error) =>
                  patchState(store, {
                    authStateCallState: { error },
                  }),
              }),
            ),
          ),
        ),
      ),
      resetPassword: rxMethod<{ token: string; password: string }>(
        pipe(
          tap(() =>
            patchState(store, {
              authStateCallState: LoadingState.LOADING,
            }),
          ),
          switchMap(({ token, password }) =>
            authService.resetPassword(token, password).pipe(
              tapResponse({
                next: () => {
                  router.navigate(['/auth/login']);
                },
                error: (error) =>
                  patchState(store, {
                    authStateCallState: { error },
                  }),
              }),
            ),
          ),
        ),
      ),
      requestPasswordReset: rxMethod<string>(
        pipe(
          tap(() =>
            patchState(store, {
              authStateCallState: LoadingState.LOADING,
            }),
          ),
          switchMap((email) =>
            authService.requestPasswordReset(email).pipe(
              tapResponse({
                next: () => {
                  router.navigate(['/auth/login']);
                },
                error: (error) =>
                  patchState(store, {
                    authStateCallState: { error },
                  }),
              }),
            ),
          ),
        ),
      ),
      logout: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {
              ...initialState,
            });
            router.navigate(['/auth/login']);
          }),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      isLoggedIn: computed(() => store.accessToken()),
      accessToken: computed(() => store.accessToken()),
    };
  }),
);
