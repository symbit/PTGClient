import { withDevtools } from '@angular-architects/ngrx-toolkit';
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
import { switchMap } from 'rxjs';

import { UserService } from '../service/user.service';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import { DefaultSearchCriteria, SearchCriteria, User } from '@ptg/shared-types';
import {
  removeAllEntities,
  removeEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { LoadingService } from '@ptg/shared/feature-loading';

interface UserState {
  user: User | null;
  criteria: SearchCriteria;
  total: number;
  maxPage: number;
}

const initialState: UserState = {
  user: null,
  criteria: DefaultSearchCriteria,
  total: 0,
  maxPage: 0,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withDevtools('user'),
  withState(initialState),
  withEntities<User>(),
  withCallState('user state'),
  withMethods((store) => {
    const service = inject(UserService);
    const router = inject(Router);
    const toastrService = inject(ToastrService);
    const loadingService = inject(LoadingService);

    return {
      loadUsers: rxMethod<SearchCriteria>(
        switchMap((searchCriteria: SearchCriteria) => {
          patchState(
            store,
            {
              userStateCallState: LoadingState.LOADING,
              criteria: searchCriteria,
              user: null,
            },
            removeAllEntities(),
          );

          return service.getUsers(searchCriteria).pipe(
            tapResponse({
              next: (result) => {
                patchState(
                  store,
                  {
                    total: result.total,
                    maxPage: result.maxPage,
                    userStateCallState: LoadingState.LOADED,
                  },
                  setAllEntities(result.results),
                );
              },
              error: (error) =>
                patchState(store, {
                  userStateCallState: { error },
                }),
            }),
          );
        }),
      ),
      loadUser: rxMethod<number>(
        switchMap((id: number) => {
          patchState(store, {
            userStateCallState: LoadingState.LOADING,
          });

          return service.getUser(id).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  user: result,
                  userStateCallState: LoadingState.LOADED,
                });
              },
              error: (error) =>
                patchState(store, {
                  userStateCallState: { error },
                }),
            }),
          );
        }),
      ),
      deleteUser: rxMethod<number>(
        switchMap((id: number) => {
          loadingService.setLoading(true);

          return service.deleteUser(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, removeEntity(id));
                loadingService.setLoading(false);
              },
              error: () => loadingService.setLoading(false),
            }),
          );
        }),
      ),
      createUser: rxMethod<User>(
        switchMap((user: User) => {
          loadingService.setLoading(true);

          return service.createUser(user).pipe(
            tapResponse({
              next: () => {
                router.navigate(['/users']);
                toastrService.success('Użytkownik utworzony pomyślnie!');
                loadingService.setLoading(false);
              },
              error: () => loadingService.setLoading(false),
            }),
          );
        }),
      ),
      editUser: rxMethod<User>(
        switchMap((user: User) => {
          loadingService.setLoading(true);

          return service.editUser(user).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  user: result,
                });
                loadingService.setLoading(false);
              },
              error: () => loadingService.setLoading(false),
            }),
          );
        }),
      ),
      updatePassword: rxMethod<{ email: string; newPassword: string }>(
        switchMap(({ email, newPassword }) => {
          loadingService.setLoading(true);

          return service.updatePassword(email, newPassword).pipe(
            tapResponse({
              next: () => {
                loadingService.setLoading(false);
              },
              error: () => loadingService.setLoading(false),
            }),
          );
        }),
      ),
      inviteUser: rxMethod<number>(
        switchMap((id: number) => {
          loadingService.setLoading(true);

          return service.inviteUser(id).pipe(
            tapResponse({
              next: () => {
                toastrService.success('Użytkownik zaproszony');
                loadingService.setLoading(false);
              },
              error: () => loadingService.setLoading(false),
            }),
          );
        }),
      ),
    };
  }),
  withComputed((store) => ({
    isLoading: computed(() => store.isUserStateLoading()),
  })),
);
