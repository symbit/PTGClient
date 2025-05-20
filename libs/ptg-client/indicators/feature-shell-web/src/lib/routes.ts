import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { IndicatorsListComponent } from '@ptg/indicators-feature-indicators-list';
import { IndicatorDetailsComponent } from '@ptg/indicators-feature-indicator-details';

export const routes: Routes = [
  {
    path: '',
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
