import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesStatisticsComponent } from './components/articles-statistics/articles-statistics.component';
import { inject } from '@angular/core';
import { ArticlesStore } from '@ptg/articles-data-access-articles';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      {
        path: '',
        resolve: [
          () => {
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
        ],
        component: ArticlesListComponent,
      },
      {
        path: 'rejected',
        resolve: [
          () => {
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
        ],
        component: ArticlesListComponent,
      },
      {
        path: 'statistics',
        component: ArticlesStatisticsComponent,
      },
    ],
  },
];
