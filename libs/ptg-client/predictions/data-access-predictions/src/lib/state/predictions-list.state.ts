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
import {
  removeAllEntities,
  removeEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { firstValueFrom, switchMap } from 'rxjs';

import { PredictionsService } from '../service/predictions.service';

import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import { CreatePrediction, Prediction } from '@ptg/predictions-types';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ForceNewPredictionComponent } from '@ptg/predictions-ui-force-new-prediction-dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@ptg/shared/feature-loading';

interface PredictionsListState {
  criteria: SearchCriteria;
  total: number;
  maxPage: number;
}

const initialState: PredictionsListState = {
  criteria: DefaultSearchCriteria,
  total: 0,
  maxPage: 0,
};

export const PredictionsListStore = signalStore(
  withDevtools('predictionsList'),
  withState(initialState),
  withEntities<Prediction>(),
  withCallState('predictionsList'),
  withMethods((store) => {
    const service = inject(PredictionsService);
    const router = inject(Router);
    const dialogService = inject(DialogService);
    const toastrService = inject(ToastrService);
    const loadingService = inject(LoadingService);

    return {
      loadPredictions: rxMethod<SearchCriteria>(
        switchMap((searchCriteria: SearchCriteria) => {
          patchState(
            store,
            {
              predictionsListCallState: LoadingState.LOADING,
              criteria: searchCriteria,
            },
            removeAllEntities(),
          );

          return service.getPredictions(searchCriteria).pipe(
            tapResponse({
              next: (result) => {
                patchState(
                  store,
                  {
                    total: result.total,
                    maxPage: result.maxPage,
                    predictionsListCallState: LoadingState.LOADED,
                  },
                  setAllEntities(result.results),
                );
              },
              error: (error: string) =>
                patchState(store, {
                  predictionsListCallState: { error },
                }),
            }),
          );
        }),
      ),
      createPrediction: rxMethod<CreatePrediction>(
        switchMap((payload: CreatePrediction) => {
          loadingService.setLoading(true);

          return service.createPrediction(payload).pipe(
            tapResponse({
              next: async (result) => {
                if (result.created) {
                  router.navigate(['predictions']);
                  loadingService.setLoading(false);
                } else {
                  const force = await firstValueFrom(
                    dialogService.open(ForceNewPredictionComponent, {
                      header: 'Czy na pewno chcesz stworzyć nową prognozę?',
                      modal: true,
                    }).onClose,
                  );

                  if (force) {
                    await firstValueFrom(
                      service.createPrediction({
                        ...payload,
                        forceNewPrediction: true,
                      }),
                    );
                    toastrService.info(
                      'Prognoza jest aktualnie generowana. Może to potrwać chwilę. Powiadomimy Cię, gdy będzie gotowa.',
                      'Sukces!',
                    );
                    router.navigate(['predictions']);
                  } else {
                    router.navigate(['predictions', result.prediction.id]);
                  }
                  loadingService.setLoading(false);
                }
              },
              error: (error: string) =>
                patchState(store, {
                  predictionsListCallState: { error },
                }),
            }),
          );
        }),
      ),
      deletePrediction: rxMethod<number>(
        switchMap((id: number) => {
          loadingService.setLoading(true);
          return service.deletePrediction(id).pipe(
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
    };
  }),
  withComputed((store) => ({
    isLoading: computed(() => store.isPredictionsListLoading()),
  })),
);
