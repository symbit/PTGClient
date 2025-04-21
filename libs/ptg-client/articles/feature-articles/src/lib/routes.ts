import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesStatisticsComponent } from './components/articles-statistics/articles-statistics.component';

export const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      {
        path: '',
        component: ArticlesListComponent,
      },
      {
        path: 'rejected',
        component: ArticlesListComponent,
      },
      {
        path: 'statistics',
        component: ArticlesStatisticsComponent,
      },
    ],
  },
];
