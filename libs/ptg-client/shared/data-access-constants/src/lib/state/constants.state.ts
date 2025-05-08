import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { ConstantsService } from '../service/constants.service';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';

interface ConstantsState {
  sources: string[] | null;
  sectors: string[] | null;
  regions: string[] | null;
  frequencies: string[] | null;
}

const initialState: ConstantsState = {
  sources: null,
  sectors: null,
  regions: null,
  frequencies: null,
};

export const ConstantsStore = signalStore(
  { providedIn: 'root' },
  withDevtools('constants'),
  withState(initialState),
  withCallState('constants state'),
  withMethods((store) => {
    const service = inject(ConstantsService);

    return {
      loadSources: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            constantsStateCallState: LoadingState.LOADING,
          });

          return service.getSources().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  sources: result,
                });
              },
              error: (error) =>
                patchState(store, {
                  constantsStateCallState: { error },
                }),
            }),
          );
        }),
      ),
      loadSectors: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            constantsStateCallState: LoadingState.LOADING,
          });

          return service.getSectors().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  sectors: result,
                });
              },
              error: (error) =>
                patchState(store, {
                  constantsStateCallState: { error },
                }),
            }),
          );
        }),
      ),
      loadRegions: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            constantsStateCallState: LoadingState.LOADING,
          });

          return service.getRegions().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  regions: result,
                });
              },
              error: (error) =>
                patchState(store, {
                  constantsStateCallState: { error },
                }),
            }),
          );
        }),
      ),
      loadFrequencies: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            constantsStateCallState: LoadingState.LOADING,
          });

          return service.getFrequencies().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  frequencies: result,
                });
              },
              error: (error) =>
                patchState(store, {
                  constantsStateCallState: { error },
                }),
            }),
          );
        }),
      ),
    };
  }),
);
