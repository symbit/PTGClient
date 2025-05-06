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
  addEntities,
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Indicator, RealizationData } from '@ptg/indicators-types';
import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';
import { IndicatorRealizationDataService } from '../service/indicator-realization-data.service';
import { ToastrService } from 'ngx-toastr';

interface IndicatorsState {
  indicator: Indicator | null;
  criteria: SearchCriteria;
  total: number;
  maxPage: number;
}

const initialState: IndicatorsState = {
  indicator: null,
  criteria: DefaultSearchCriteria,
  total: 0,
  maxPage: 0,
};

export const IndicatorDetailsStore = signalStore(
  withDevtools('indicator details'),
  withState(initialState),
  withEntities<RealizationData>(),
  withCallState('indicator details'),
  withMethods((store) => {
    const service = inject(IndicatorsService);
    const indicatorRealizationDataService = inject(
      IndicatorRealizationDataService,
    );
    const toastrService = inject(ToastrService);

    return {
      loadIndicator: rxMethod<number>(
        switchMap((id: number) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
          });

          return service.getIndicator(id).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  indicator: result,
                  indicatorDetailsCallState: LoadingState.LOADED,
                });
              },
              error: (error) =>
                patchState(store, {
                  indicatorDetailsCallState: { error },
                }),
            }),
          );
        }),
      ),
      editIndicator: rxMethod<Indicator>(
        switchMap((indicator: Indicator) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
          });

          return service.editIndicator(indicator).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  indicator: result,
                  indicatorDetailsCallState: LoadingState.LOADED,
                });
              },
              error: (error) => {
                toastrService.error('Błąd edycji wskaźnika', 'Error');
                patchState(store, {
                  indicatorDetailsCallState: { error },
                });
              },
            }),
          );
        }),
      ),
      loadRealizationData: rxMethod<{
        searchCriteria: SearchCriteria;
        id: number;
      }>(
        switchMap(({ searchCriteria, id }) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
            criteria: searchCriteria,
          });

          return indicatorRealizationDataService
            .getRealizationData(searchCriteria, id)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(
                    store,
                    {
                      total: result.total,
                      maxPage: result.maxPage,
                      indicatorDetailsCallState: LoadingState.LOADED,
                    },
                    setAllEntities(result.results),
                  );
                },
                error: (error) => {
                  toastrService.error('Błąd ładowania danych', 'Error');
                  patchState(store, {
                    indicatorDetailsCallState: { error },
                  });
                },
              }),
            );
        }),
      ),
      importDataPoints: rxMethod<{ file: File; id: number }>(
        switchMap(({ file, id }) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
          });

          return indicatorRealizationDataService
            .importDataPoints(file, id)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(
                    store,
                    {
                      indicatorDetailsCallState: LoadingState.LOADED,
                    },
                    addEntities(result),
                  );
                },
                error: (error) => {
                  toastrService.error('Import danych nie powiódł się', 'Error');
                  patchState(store, {
                    indicatorDetailsCallState: { error },
                  });
                },
              }),
            );
        }),
      ),
      addRealizationDataPoint: rxMethod<{ data: RealizationData; id: number }>(
        switchMap(({ data, id }) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
          });

          return indicatorRealizationDataService
            .addRealizationDataPoint(data, id)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(
                    store,
                    {
                      indicatorDetailsCallState: LoadingState.LOADED,
                    },
                    addEntity(result),
                  );
                },
                error: (error) => {
                  toastrService.error(
                    'Dodawanie punktu danych nie powiodło się',
                    'Error',
                  );
                  patchState(store, {
                    indicatorDetailsCallState: { error },
                  });
                },
              }),
            );
        }),
      ),
      editRealizationDataPoint: rxMethod<RealizationData>(
        switchMap((data: RealizationData) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
          });

          return indicatorRealizationDataService
            .editRealizationDataPoint(data)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(
                    store,
                    {
                      indicatorDetailsCallState: LoadingState.LOADED,
                    },
                    updateEntity({ id: result.id, changes: result }),
                  );
                },
                error: (error) => {
                  toastrService.error(
                    'Edycja punktu danych nie powiodła się',
                    'Error',
                  );
                  patchState(store, {
                    indicatorDetailsCallState: { error },
                  });
                },
              }),
            );
        }),
      ),
      removeRealizationDataPoint: rxMethod<number>(
        switchMap((id: number) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
          });

          return indicatorRealizationDataService
            .removeRealizationDataPoint(id)
            .pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    {
                      indicatorDetailsCallState: LoadingState.LOADED,
                    },
                    removeEntity(id),
                  );
                },
                error: (error) => {
                  toastrService.error(
                    'Usunięcie punktu danych nie powiodło się',
                    'Error',
                  );
                  patchState(store, {
                    indicatorDetailsCallState: { error },
                  });
                },
              }),
            );
        }),
      ),
    };
  }),
  withComputed((store) => ({
    realizations: computed(() => store.indicator()?.realizations || []),
  })),
);
