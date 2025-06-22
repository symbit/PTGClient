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

import { PredictionsService } from '../service/predictions.service';

import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import { ForecastTableData, Prediction } from '@ptg/predictions-types';
import { Router } from '@angular/router';
import { fileDownload } from '@ptg/shared-utils';
import { LoadingService } from '@ptg/shared/feature-loading';

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
    const loadingService = inject(LoadingService);

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
      generatePdf: rxMethod<number>(
        switchMap((id: number) => {
          loadingService.setLoading(true);
          patchState(store, {
            predictionDetailsCallState: LoadingState.LOADING,
          });

          return service.getPredictionPdf(id).pipe(
            tapResponse({
              next: (pdfBlob) => {
                fileDownload(
                  pdfBlob,
                  `${store.prediction()?.predictionDefinition.name}.pdf`,
                );
                loadingService.setLoading(false);
              },
              error: (error: string) => {
                loadingService.setLoading(false);

                patchState(store, {
                  predictionDetailsCallState: { error },
                });
              },
            }),
          );
        }),
      ),
    };
  }),
  withComputed((store) => ({
    forecastTableData: computed<ForecastTableData[]>(() => {
      const forecast = store.prediction()?.analysisResults.forecast;

      if (!forecast) return [];

      return forecast.dates.map((date, index) => ({
        date,
        value: forecast.values[index],
        predictionLowerCi: forecast.predictionLowerCi[index],
        predictionUpperCi: forecast.predictionUpperCi[index],
      }));
    }),
  })),
);
