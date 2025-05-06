import { FeatureShellWebComponent } from './feature-shell-web/feature-shell-web.component';
import { Routes } from '@angular/router';
import { authGuard } from '@ptg/auth-data-access-auth';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ptg/auth-feature-auth').then((m) => m.routes),
  },
  {
    path: '',
    component: FeatureShellWebComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@ptg/dashboard-feature-dashboard').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'indicators',
        loadChildren: () =>
          import('@ptg/indicators-feature-shell-web').then((m) => m.routes),
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
          import('@ptg/users-feature-users').then((m) => m.routes),
      },
    ],
  },
];
