import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@ptg/feature-shell-web').then((m) => m.routes),
  },
];
