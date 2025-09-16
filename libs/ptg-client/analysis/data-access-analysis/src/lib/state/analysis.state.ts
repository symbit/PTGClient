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

import {
  Analysis,
  ComparativeAnalysisChart,
  CreateAnalysis,
  ExportAnalysis,
  RealizationDetails,
} from '@ptg/analysis-types';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { round, uniq } from 'lodash-es';
import { LoadingService } from '@ptg/shared/feature-loading';
import { HttpErrorResponse } from '@angular/common/http';
import { fileDownload, regionMapper, sectorMapper } from '@ptg/shared-utils';

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
  withMethods((store) => {
    const service = inject(AnalysisService);
    const toastrService = inject(ToastrService);
    const router = inject(Router);
    const loadingService = inject(LoadingService);

    return {
      createAnalysis: rxMethod<CreateAnalysis>(
        switchMap((payload: CreateAnalysis) => {
          loadingService.setLoading(true);

          return service.createAnalysis(payload).pipe(
            tapResponse({
              next: (result) => {
                router.navigate(['/analysis/results']);
                patchState(store, {
                  analysis: result,
                });
                loadingService.setLoading(false);
              },
              error: (error: HttpErrorResponse) => {
                toastrService.error(error.error.detail, 'Błąd');
                loadingService.setLoading(false);
              },
            }),
          );
        }),
      ),
      updateAnalysis: rxMethod<CreateAnalysis>(
        switchMap((payload: CreateAnalysis) => {
          loadingService.setLoading(true);

          return service.createAnalysis(payload).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  analysis: result,
                });
                loadingService.setLoading(false);
              },
              error: () => {
                toastrService.error('Bład podczas tworzenia analizy.', 'Błąd');
                loadingService.setLoading(false);
              },
            }),
          );
        }),
      ),
      exportAnalysis: rxMethod<ExportAnalysis>(
        switchMap((payload: ExportAnalysis) => {
          loadingService.setLoading(true);

          return service.exportAnalysis(payload).pipe(
            tapResponse({
              next: (pdfBlob) => {
                fileDownload(pdfBlob, `analiza.xlsx`);
                loadingService.setLoading(false);
              },
              error: () => {
                loadingService.setLoading(false);
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
        indicators: analysis.analysisResults.map(
          (result) => result.realizationDetails,
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

      return analysis.analysisResults[0].rawTimeSeries.values
        .map((value, index) => {
          return {
            date: analysis.analysisResults[0].rawTimeSeries.dates[index],
            value: analysis.analysisResults.map(
              (result) => result.rawTimeSeries.values[index],
            ),

            trend: analysis.analysisResults[0].indicatorTrend[index],
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date));
    }),
    comparativeAnalysisChart: computed<ComparativeAnalysisChart>(() => {
      const analysis = store.analysis();

      return {
        labels: analysis?.analysisResults[0].rawTimeSeries.dates || [],
        datasets:
          analysis?.analysisResults.map((result) => {
            return {
              indicatorId: result.realizationDetails.indicatorId,
              label: `${result.realizationDetails.indicatorName} (${regionMapper(result.realizationDetails.indicatorRegion)}, ${sectorMapper(result.realizationDetails.indicatorSector)})`,
              data: result.rawTimeSeries.values,
              indicatorUnit: result.realizationDetails.indicatorUnit,
            };
          }) || [],
      };
    }),
    resultsAnalysis: computed<Record<string, number>>(() => {
      const analysis = store.analysis();

      if (!analysis?.correlation) return { correlation: 0 };

      return {
        correlation: round(analysis.correlation, 3),
      };
    }),
    realizationsIds: computed<number[]>(
      () =>
        store
          .analysis()
          ?.analysisResults.map(
            (result) => result.realizationDetails.realizationId,
          ) || [],
    ),
  })),
);
