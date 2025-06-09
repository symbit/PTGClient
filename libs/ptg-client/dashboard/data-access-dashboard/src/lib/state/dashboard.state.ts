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

import { DashboardService } from '../service/dashboard.service';
import { Article } from '@ptg/articles-types';
import { Prediction } from '@ptg/predictions-types';
import { CurrentJobOffers } from '../types/current-job-offers';
import { LastYearJobOffers } from '../types/last-year-job-offers';
import { DashboardChartData } from '../types/dashboard-chart-data';

interface DashboardState {
  predictions: Prediction[] | null;
  articles: Article[] | null;
  currentJobOffers: CurrentJobOffers | null;
  lastYearJobOffers: LastYearJobOffers | null;
  unemploymentRateData: DashboardChartData[] | null;
  loading: Record<string, boolean>;
}

const initialState: DashboardState = {
  predictions: null,
  articles: null,
  currentJobOffers: null,
  lastYearJobOffers: null,
  unemploymentRateData: null,
  loading: {
    predictions: false,
    articles: false,
    currentJobOffers: false,
    lastYearJobOffers: false,
    unemploymentRateData: false,
  },
};

export const DashboardStore = signalStore(
  withDevtools('dashboard'),
  withState(initialState),
  withMethods((store) => {
    const service = inject(DashboardService);

    return {
      loadRecentPredictions: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            loading: {
              ...store.loading(),
              predictions: true,
            },
          });

          return service.getRecentPredictions().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  predictions: result,
                  loading: {
                    ...store.loading(),
                    predictions: false,
                  },
                });
              },
              error: () =>
                patchState(store, {
                  loading: {
                    ...store.loading(),
                    predictions: false,
                  },
                }),
            }),
          );
        }),
      ),
      loadRecentArticles: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            loading: {
              ...store.loading(),
              articles: true,
            },
          });

          return service.getRecentArticles().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  articles: result,
                  loading: {
                    ...store.loading(),
                    articles: false,
                  },
                });
              },
              error: () =>
                patchState(store, {
                  loading: {
                    ...store.loading(),
                    articles: false,
                  },
                }),
            }),
          );
        }),
      ),
      loadCurrentJobOffers: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            loading: {
              ...store.loading(),
              currentJobOffers: true,
            },
          });

          return service.getCurrentJobOffers().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  currentJobOffers: result,
                  loading: {
                    ...store.loading(),
                    currentJobOffers: false,
                  },
                });
              },
              error: () =>
                patchState(store, {
                  loading: {
                    ...store.loading(),
                    currentJobOffers: false,
                  },
                }),
            }),
          );
        }),
      ),
      loadLastYearJobOffers: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            loading: {
              ...store.loading(),
              lastYearJobOffers: true,
            },
          });

          return service.getLastYearJobOffers().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  lastYearJobOffers: result,
                  loading: {
                    ...store.loading(),
                    lastYearJobOffers: false,
                  },
                });
              },
              error: () =>
                patchState(store, {
                  loading: {
                    ...store.loading(),
                    lastYearJobOffers: false,
                  },
                }),
            }),
          );
        }),
      ),
      loadUnemploymentRateData: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            loading: {
              ...store.loading(),
              unemploymentRateData: true,
            },
          });

          return service.getUnemploymentRateData().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  unemploymentRateData: result,
                  loading: {
                    ...store.loading(),
                    unemploymentRateData: false,
                  },
                });
              },
              error: () =>
                patchState(store, {
                  loading: {
                    ...store.loading(),
                    unemploymentRateData: false,
                  },
                }),
            }),
          );
        }),
      ),
    };
  }),
  withComputed((store) => ({
    isLoading: computed(() =>
      Object.values(store.loading()).some((loading) => loading),
    ),
  })),
);
