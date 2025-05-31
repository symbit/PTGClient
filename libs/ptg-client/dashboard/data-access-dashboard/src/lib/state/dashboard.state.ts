import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { DashboardService } from '../service/dashboard.service';
import { Article } from '@ptg/articles-types';
import { withCallState } from '@ptg/shared-utils-signal-store';
import { Prediction } from '@ptg/predictions-types';
import { Indicator } from '@ptg/indicators-types';

interface DashboardState {
  predictions: Prediction[] | null;
  articles: Article[] | null;
  indicators: Indicator[] | null;
}

const initialState: DashboardState = {
  predictions: null,
  articles: null,
  indicators: null,
};

export const DashboardStore = signalStore(
  withDevtools('dashboard'),
  withState(initialState),
  withCallState('dashboard'),
  withMethods((store) => {
    const service = inject(DashboardService);

    return {
      loadRecentPredictions: rxMethod<void>(
        switchMap(() => {
          return service.getRecentPredictions().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  predictions: result,
                });
              },
              error: (error: string) =>
                patchState(store, {
                  dashboardCallState: { error },
                }),
            }),
          );
        }),
      ),
      loadRecentArticles: rxMethod<void>(
        switchMap(() => {
          return service.getRecentArticles().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  articles: result,
                });
              },
              error: (error: string) =>
                patchState(store, {
                  dashboardCallState: { error },
                }),
            }),
          );
        }),
      ),
      loadRecentlyUpdatedIndicators: rxMethod<void>(
        switchMap(() => {
          return service.getRecentlyUpdatedIndicators().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  indicators: result,
                });
              },
              error: (error: string) =>
                patchState(store, {
                  dashboardCallState: { error },
                }),
            }),
          );
        }),
      ),
    };
  }),
);
