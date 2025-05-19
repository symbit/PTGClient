import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesStatisticsComponent } from './components/articles-statistics/articles-statistics.component';
import { inject } from '@angular/core';
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
        path: 'statistics',
        component: ArticlesStatisticsComponent,
      },
      {
        path: 'accepted',
        resolve: {
          type: () => 'accepted',
        },
        component: ArticlesListComponent,
      },
      {
        path: 'rejected',
        resolve: {
          type: () => 'rejected',
        },
        component: ArticlesListComponent,
      },
      {
        path: '**',
        redirectTo: 'statistics',
      },
    ],
  },
];
