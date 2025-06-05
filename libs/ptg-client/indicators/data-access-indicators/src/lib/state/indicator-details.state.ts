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
import { LoadingState } from '@ptg/shared-utils-signal-store';
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
import { LoadingService } from '@ptg/shared/feature-loading';

interface IndicatorDetailsState {
  indicator: Indicator | null;
  criteria: SearchCriteria;
  total: number;
  maxPage: number;
  indicatorDetailsCallState: LoadingState;
  indicatorDataCallState: LoadingState;
}

const initialState: IndicatorDetailsState = {
  indicator: null,
  criteria: DefaultSearchCriteria,
  total: 0,
  maxPage: 0,
  indicatorDetailsCallState: LoadingState.INIT,
  indicatorDataCallState: LoadingState.INIT,
};

export const IndicatorDetailsStore = signalStore(
  withDevtools('indicator details'),
  withState(initialState),
  withEntities<RealizationData>(),
  withMethods((store) => {
    const service = inject(IndicatorsService);
    const indicatorRealizationDataService = inject(
      IndicatorRealizationDataService,
    );
    const toastrService = inject(ToastrService);
    const loadingService = inject(LoadingService);

    return {
      loadIndicator: rxMethod<number>(
        switchMap((id: number) => {
          patchState(store, {
            indicatorDetailsCallState: LoadingState.LOADING,
            indicatorDataCallState: LoadingState.LOADING,
          });

          return service.getIndicator(id).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  indicator: result,
                  indicatorDetailsCallState: LoadingState.LOADED,
                });
              },
              error: () =>
                patchState(store, {
                  indicatorDetailsCallState: LoadingState.LOADED,
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
              error: () => {
                toastrService.error('Błąd edycji wskaźnika', 'Error');
                patchState(store, {
                  indicatorDetailsCallState: LoadingState.LOADED,
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
            indicatorDataCallState: LoadingState.LOADING,
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
                      indicatorDataCallState: LoadingState.LOADED,
                    },
                    setAllEntities(result.results),
                  );
                },
                error: () => {
                  toastrService.error('Błąd ładowania danych', 'Error');
                  patchState(store, {
                    indicatorDataCallState: LoadingState.LOADED,
                  });
                },
              }),
            );
        }),
      ),
      importDataPoints: rxMethod<{ file: File; id: number }>(
        switchMap(({ file, id }) => {
          return indicatorRealizationDataService
            .importDataPoints(file, id)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(store, addEntities(result));
                },
                error: () => {
                  toastrService.error('Import danych nie powiódł się', 'Error');
                },
              }),
            );
        }),
      ),
      addRealizationDataPoint: rxMethod<{ data: RealizationData; id: number }>(
        switchMap(({ data, id }) => {
          loadingService.setLoading(true);

          return indicatorRealizationDataService
            .addRealizationDataPoint(data, id)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(store, addEntity(result));
                  loadingService.setLoading(false);
                },
                error: () => {
                  toastrService.error(
                    'Dodawanie punktu danych nie powiodło się',
                    'Error',
                  );
                  loadingService.setLoading(false);
                },
              }),
            );
        }),
      ),
      editRealizationDataPoint: rxMethod<RealizationData>(
        switchMap((data: RealizationData) => {
          loadingService.setLoading(true);

          return indicatorRealizationDataService
            .editRealizationDataPoint(data)
            .pipe(
              tapResponse({
                next: (result) => {
                  patchState(
                    store,
                    updateEntity({ id: result.id, changes: result }),
                  );
                  loadingService.setLoading(false);
                },
                error: () => {
                  toastrService.error(
                    'Edycja punktu danych nie powiodła się',
                    'Error',
                  );
                  loadingService.setLoading(false);
                },
              }),
            );
        }),
      ),
      removeRealizationDataPoint: rxMethod<number>(
        switchMap((id: number) => {
          loadingService.setLoading(true);

          return indicatorRealizationDataService
            .removeRealizationDataPoint(id)
            .pipe(
              tapResponse({
                next: () => {
                  patchState(store, removeEntity(id));
                  loadingService.setLoading(false);
                },
                error: () => {
                  toastrService.error(
                    'Usunięcie punktu danych nie powiodło się',
                    'Error',
                  );
                  loadingService.setLoading(false);
                },
              }),
            );
        }),
      ),
    };
  }),
  withComputed((store) => ({
    realizations: computed(() => store.indicator()?.realizations || []),
    isIndicatorDetailsLoading: computed(
      () => store.indicatorDetailsCallState() === LoadingState.LOADING,
    ),
    isIndicatorDataLoading: computed(
      () => store.indicatorDataCallState() === LoadingState.LOADING,
    ),
  })),
);
