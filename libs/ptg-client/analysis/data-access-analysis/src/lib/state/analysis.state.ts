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

import { AnalysisService } from '../service/analysis.service';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';

import { Analysis, CreateAnalysis } from '@ptg/analysis-types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface AnalysisState {
  analysis: Analysis | null;
}

const initialState: AnalysisState = {
  analysis: null,
};

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withDevtools('analysis'),
  withState(initialState),
  withCallState('analysis'),
  withMethods((store) => {
    const service = inject(AnalysisService);
    const toastrService = inject(ToastrService);
    const router = inject(Router);

    return {
      createAnalysis: rxMethod<CreateAnalysis>(
        switchMap((payload: CreateAnalysis) => {
          patchState(store, {
            analysisCallState: LoadingState.LOADING,
          });

          return service.createAnalysis(payload).pipe(
            tapResponse({
              next: (result) => {
                router.navigate(['/analysis/results']);
                patchState(store, {
                  analysis: result,
                  analysisCallState: LoadingState.LOADED,
                });
              },
              error: (error) => {
                toastrService.error('Bład podczas tworzenia analizy.', 'Error');
                patchState(store, {
                  analysisCallState: { error },
                });
              },
            }),
          );
        }),
      ),
    };
  }),
  withComputed((store) => ({
    analysisDetails: computed(() => {
      const analysis = store.analysis();

      if (!analysis) return null;

      return {
        startDate: analysis.startDate,
        endDate: analysis.endDate,
        ...analysis.realizationDetails,
      };
    }),
    rawDataTable: computed(() => {
      const analysis = store.analysis();

      if (!analysis) return [];

      return analysis.rawTimeSeries.values.map((value, index) => {
        return {
          date: analysis.rawTimeSeries.dates[index],
          value: value,
          trend: analysis.indicatorTrend[index],
        };
      });
    }),
  })),
);
