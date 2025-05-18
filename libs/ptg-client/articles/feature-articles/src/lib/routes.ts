import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesStatisticsComponent } from './components/articles-statistics/articles-statistics.component';
import { inject } from '@angular/core';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { ConstantsStore } from '@ptg/shared-data-access-constants';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    resolve: [
      () => {
        inject(ConstantsStore).loadSectors();
      },
    ],
    children: [
      {
        path: '',
        component: ArticlesStatisticsComponent,
      },
      {
        path: 'accepted',
        resolve: {
          data: () => {
            const state = inject(ArticlesStore);

            state.loadArticles({
              ...state.criteria(),
              filters: [
                {
                  name: 'isRelevant',
                  value: true,
                  behaviour: 'AND',
                },
              ],
            });
          },
          type: () => 'accepted',
        },
        component: ArticlesListComponent,
      },
      {
        path: 'rejected',
        resolve: {
          data: () => {
            const state = inject(ArticlesStore);

            state.loadArticles({
              ...state.criteria(),
              filters: [
                {
                  name: 'isRelevant',
                  value: false,
                  behaviour: 'AND',
                },
              ],
            });
          },
          type: () => 'rejected',
        },
        component: ArticlesListComponent,
      },
    ],
  },
];
