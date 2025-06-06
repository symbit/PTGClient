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
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { ArticlesService } from '../service/articles.service';
import {
  Article,
  ArticleInsights,
  ArticlesStatistics,
  NumberOfArticlesByRelevancy,
  NumberOfArticlesBySentiment,
  NumberOfArticlesBySource,
  Sentiment,
} from '@ptg/articles-types';
import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';
import { LoadingState, withCallState } from '@ptg/shared-utils-signal-store';
import { LoadingService } from '@ptg/shared/feature-loading';

interface ArticlesState {
  criteria: SearchCriteria;
  statistics: ArticlesStatistics | null;
  total: number;
  maxPage: number;
}

const initialState: ArticlesState = {
  criteria: DefaultSearchCriteria,
  statistics: null,
  total: 0,
  maxPage: 0,
};

export const ArticlesStore = signalStore(
  withDevtools('articles'),
  withState(initialState),
  withEntities<Article>(),
  withCallState('articles'),
  withMethods((store) => {
    const service = inject(ArticlesService);
    const loadingService = inject(LoadingService);

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
                    articlesCallState: LoadingState.LOADED,
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
          loadingService.setLoading(true);

          return service.setRelevancy(id, relevancy).pipe(
            tapResponse({
              next: (result) => {
                patchState(store, removeEntity(result.id));
                loadingService.setLoading(false);
              },
              error: () => {
                loadingService.setLoading(false);
              },
            }),
          );
        }),
      ),
      setSentiment: rxMethod<{ id: number; sentiment: Sentiment }>(
        switchMap(({ id, sentiment }) => {
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
      loadNewsDashboard: rxMethod<void>(
        switchMap(() => {
          patchState(store, {
            articlesCallState: LoadingState.LOADING,
          });

          return service.getNewsDashboard().pipe(
            tapResponse({
              next: (result) => {
                patchState(store, {
                  statistics: result,
                  articlesCallState: LoadingState.LOADED,
                });
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
  withComputed((store) => ({
    totalNumberOfArticles: computed<number>(
      () => store.statistics()?.totalNumberOfArticles || 0,
    ),
    numberOfArticlesByRelevancy: computed<NumberOfArticlesByRelevancy | null>(
      () => store.statistics()?.numberOfArticlesByRelevancy || null,
    ),
    numberOfArticlesBySentiment: computed<NumberOfArticlesBySentiment | null>(
      () => store.statistics()?.numberOfArticlesBySentiment || null,
    ),
    numberOfArticlesBySource: computed<NumberOfArticlesBySource | null>(
      () => store.statistics()?.numberOfArticlesBySource || null,
    ),
    articleInsights: computed<ArticleInsights | null>(
      () => store.statistics()?.articleInsights || null,
    ),
    isLoading: computed(() => store.isArticlesLoading()),
  })),
);
