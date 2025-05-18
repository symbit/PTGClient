import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  removeAllEntities,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { ArticlesService } from '../service/articles.service';
import { Article, Sentiment } from '@ptg/articles-types';
import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';

interface ArticlesState {
  criteria: SearchCriteria;
  total: number;
  maxPage: number;
}

const initialState: ArticlesState = {
  criteria: DefaultSearchCriteria,
  total: 0,
  maxPage: 0,
};

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('articles'),
  withState(initialState),
  withEntities<Article>(),
  withCallState('articles'),
  withMethods((store) => {
    const service = inject(ArticlesService);

    return {
      loadArticles: rxMethod<SearchCriteria>(
        switchMap((searchCriteria: SearchCriteria) => {
          patchState(
            store,
            {
              articlesCallState: LoadingState.LOADING,
              criteria: searchCriteria,
            },
            removeAllEntities(),
          );

          return service.getArticles(searchCriteria).pipe(
            tapResponse({
              next: (result) => {
                patchState(
                  store,
                  {
                    total: result.total,
                    maxPage: result.maxPage,
                  },
                  setAllEntities(result.results),
                );
              },
              error: (error: string) =>
                patchState(store, {
                  articlesCallState: { error },
                }),
            }),
          );
        }),
      ),
      setRelevancy: rxMethod<{ id: number; relevancy: boolean }>(
        switchMap(({ id, relevancy }) => {
          patchState(store, {
            articlesCallState: LoadingState.LOADING,
          });

          return service.setRelevancy(id, relevancy).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, removeEntity(result.id));
              },
              error: (error: string) =>
                patchState(store, {
                  articlesCallState: { error },
                }),
            }),
          );
        }),
      ),
      setSentiment: rxMethod<{ id: number; sentiment: Sentiment }>(
        switchMap(({ id, sentiment }) => {
          patchState(store, {
            articlesCallState: LoadingState.LOADING,
          });

          return service.setSentiment(id, sentiment).pipe(
            tapResponse({
              next: (result) => {
                patchState(
                  store,
                  updateEntity({
                    id: result.id,
                    changes: result,
                  }),
                );
              },
              error: (error: string) =>
                patchState(store, {
                  articlesCallState: { error },
                }),
            }),
          );
        }),
      ),
      setSectors: rxMethod<{ id: number; sectors: string[] }>(
        switchMap(({ id, sectors }) => {
          patchState(store, {
            articlesCallState: LoadingState.LOADING,
          });

          return service.setSectors(id, sectors).pipe(
            tapResponse({
              next: (result) => {
                patchState(
                  store,
                  updateEntity({
                    id: result.id,
                    changes: result,
                  }),
                );
              },
              error: (error: string) =>
                patchState(store, {
                  articlesCallState: { error },
                }),
            }),
          );
        }),
      ),
    };
  }),
);
