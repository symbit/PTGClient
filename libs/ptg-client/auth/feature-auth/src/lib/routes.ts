import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'request-password-reset',
        loadComponent: () =>
          import(
            './request-reset-password/request-reset-password.component'
          ).then((m) => m.RequestResetPasswordComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent,
          ),
      },
      {
        path: 'confirm-invitation',
        loadComponent: () =>
          import('./confirm-invitation/confirm-invitation.component').then(
            (m) => m.ConfirmInvitationComponent,
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/auth/login',
      },
    ],
  },
];
