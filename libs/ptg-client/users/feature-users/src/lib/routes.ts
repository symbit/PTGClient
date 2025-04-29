import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { YourDataComponent } from '@ptg/users-feature-your-data';
import { inject } from '@angular/core';
import { UserStore } from '@ptg/users-data-access-users';

export const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'create',
    component: UserDetailsComponent,
  },
  {
    path: 'your-data',
    component: YourDataComponent,
  },
  {
    path: ':id',
    resolve: {
      userId: (route: ActivatedRouteSnapshot) => {
        const userId = Number(route.paramMap.get('id'));
        if (userId) inject(UserStore).loadUser(userId);
        return userId;
      },
    },
    component: UserDetailsComponent,
  },
];
