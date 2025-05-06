import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { IndicatorsListComponent } from '@ptg/indicators-feature-indicators-list';
import { inject } from '@angular/core';
import { IndicatorsStore } from '@ptg/indicators-data-access-indicators';
import { IndicatorDetailsComponent } from '@ptg/indicators-feature-indicator-details';
import { DefaultSearchCriteria } from '@ptg/shared-types';

export const routes: Routes = [
  {
    path: '',
    resolve: [
      () => {
        inject(IndicatorsStore).loadIndicators(DefaultSearchCriteria);
      },
    ],
    component: IndicatorsListComponent,
  },
  {
    path: ':id',
    resolve: {
      indicatorId: (route: ActivatedRouteSnapshot) => {
        return Number(route.paramMap.get('id'));
      },
    },
    component: IndicatorDetailsComponent,
  },
];
