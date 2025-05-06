import { withCallState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';

import { ArticlesService } from '../service/articles.service';
import { Article } from '@ptg/articles-types';
import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';

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
  withCallState(),
  withMethods((store) => {
    const service = inject(ArticlesService);

    return {
      loadArticles: rxMethod<SearchCriteria>(
        switchMap((searchCriteria: SearchCriteria) => {
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
                  callState: { error },
                }),
            }),
          );
        }),
      ),
    };
  }),
);
