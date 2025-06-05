import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { IndicatorsService } from '../service/indicators.service';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import {
  removeAllEntities,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { Indicator } from '@ptg/indicators-types';
import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';

interface IndicatorsState {
  total: number;
  maxPage: number;
  criteria: SearchCriteria;
}

const initialState: IndicatorsState = {
  total: 0,
  maxPage: 0,
  criteria: DefaultSearchCriteria,
};

export const IndicatorsStore = signalStore(
  { providedIn: 'root' },
  withDevtools('indicators'),
  withState(initialState),
  withEntities<Indicator>(),
  withCallState('indicators state'),
  withMethods((store) => {
    const service = inject(IndicatorsService);

    return {
      loadIndicators: rxMethod<SearchCriteria>(
        switchMap((searchCriteria: SearchCriteria) => {
          patchState(
            store,
            {
              criteria: searchCriteria,
              indicatorsStateCallState: LoadingState.LOADING,
            },
            removeAllEntities(),
          );

          return service.getIndicators(searchCriteria).pipe(
            tapResponse({
              next: (result) => {
                patchState(
                  store,
                  {
                    total: result.total,
                    maxPage: result.maxPage,
                    indicatorsStateCallState: LoadingState.LOADED,
                  },
                  setAllEntities(result.results),
                );
              },
              error: (error) =>
                patchState(store, {
                  indicatorsStateCallState: { error },
                }),
            }),
          );
        }),
      ),
    };
  }),
  withComputed((store) => {
    return {
      isLoading: computed(() => store.isIndicatorsStateLoading()),
    };
  }),
);
