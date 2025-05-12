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

import {
  Analysis,
  CreateAnalysis,
  RealizationDetails,
} from '@ptg/analysis-types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { round, uniq } from 'lodash-es';

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
    analysisDetails: computed<RealizationDetails | null>(() => {
      const analysis = store.analysis();

      if (!analysis) return null;

      return {
        startDate: analysis.analysisResults[0].startDate,
        endDate: analysis.analysisResults[0].endDate,
        indicatorNames: analysis.analysisResults.map(
          (result) => result.realizationDetails.indicatorName,
        ),
        indicatorSectors: uniq(
          analysis.analysisResults.map(
            (result) => result.realizationDetails.indicatorSector,
          ),
        ),
        indicatorRegions: analysis.analysisResults.map(
          (result) => result.realizationDetails.indicatorRegion,
        ),
        indicatorFrequencies: analysis.analysisResults.map(
          (result) => result.realizationDetails.indicatorFrequency,
        ),
      };
    }),
    rawDataTable: computed(() => {
      const analysis = store.analysis();

      if (!analysis) return [];

      return analysis.analysisResults[0].rawTimeSeries.values.map(
        (value, index) => {
          return {
            date: analysis.analysisResults[0].rawTimeSeries.dates[index],
            value: analysis.analysisResults.map(
              (result) => result.rawTimeSeries.values[index],
            ),

            trend: analysis.analysisResults[0].indicatorTrend[index],
          };
        },
      );
    }),
    comparativeAnalysisChart: computed(() => {
      const analysis = store.analysis();

      return {
        labels: analysis?.analysisResults[0].rawTimeSeries.dates,
        datasets: analysis?.analysisResults.map((result) => {
          return {
            label: result.realizationDetails.indicatorName,
            data: result.rawTimeSeries.values,
          };
        }),
      };
    }),
    resultsAnalysis: computed(() => {
      const analysis = store.analysis();

      if (!analysis?.correlation) return { correlation: 0 };

      return {
        correlation: round(analysis.correlation, 3),
      };
    }),
  })),
);
