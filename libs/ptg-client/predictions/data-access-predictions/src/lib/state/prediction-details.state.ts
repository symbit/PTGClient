import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { PredictionsService } from '../service/predictions.service';

import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import { Prediction } from '@ptg/predictions-types';
import { Router } from '@angular/router';

interface PredictionDetailsState {
  prediction: Prediction | null;
}

const initialState: PredictionDetailsState = {
  prediction: null,
};

export const PredictionDetailsStore = signalStore(
  withDevtools('predictionDetails'),
  withState(initialState),
  withCallState('predictionDetails'),
  withMethods((store) => {
    const service = inject(PredictionsService);
    const router = inject(Router);

    return {
      loadPrediction: rxMethod<number>(
        switchMap((id: number) => {
          patchState(store, {
            predictionDetailsCallState: LoadingState.LOADING,
          });

          return service.getPrediction(id).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  prediction: result,
                });
              },
              error: (error: string) =>
                patchState(store, {
                  predictionDetailsCallState: { error },
                }),
            }),
          );
        }),
      ),
      deletePrediction: rxMethod<number>(
        switchMap((id: number) => {
          patchState(store, {
            predictionDetailsCallState: LoadingState.LOADING,
          });

          return service.deletePrediction(id).pipe(
            tapResponse({
              next: () => {
                router.navigate(['predictions']);
              },
              error: (error: string) =>
                patchState(store, {
                  predictionDetailsCallState: { error },
                }),
            }),
          );
        }),
      ),
    };
  }),
);
