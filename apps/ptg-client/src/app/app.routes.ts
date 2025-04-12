import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@ptg/feature-shell-web').then((m) => m.FeatureShellWebComponent),
  },
];
