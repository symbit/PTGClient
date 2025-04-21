import { FeatureShellWebComponent } from './feature-shell-web/feature-shell-web.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: FeatureShellWebComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@ptg/dashboard-feature-dashboard').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'rates',
        loadChildren: () =>
          import('@ptg/rates-feature-shell-web').then((m) => m.routes),
      },
      {
        path: 'analysis',
        loadChildren: () =>
          import('@ptg/analysis-feature-shell-web').then((m) => m.routes),
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('@ptg/articles-feature-articles').then((m) => m.routes),
      },
      {
        path: 'predictions',
        loadChildren: () =>
          import('@ptg/predictions-feature-shell-web').then((m) => m.routes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@ptg/users-feature-shell-web').then((m) => m.routes),
      },
    ],
  },
];
