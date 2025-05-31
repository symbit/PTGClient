import { FeatureShellWebComponent } from './feature-shell-web/feature-shell-web.component';
import { Routes } from '@angular/router';
import { authGuard } from '@ptg/auth-data-access-auth';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@ptg/auth-feature-auth').then((m) => m.routes),
  },
  {
    path: '',
    component: FeatureShellWebComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        providers: [DashboardStore],
        resolve: [
          () => {
            const store = inject(DashboardStore);

            store.loadRecentPredictions();
            store.loadRecentArticles();
            store.loadRecentlyUpdatedIndicators();
          },
        ],
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
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/dashboard',
      },
    ],
  },
];
