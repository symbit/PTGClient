import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { PredictionsListComponent } from '@ptg/predictions-feature-predictions-list';
import { PredictionDetailsStore } from '@ptg/predictions-data-access-predictions';
import {
  PredictionCreatorStepperComponent,
  PredictionDetailsComponent,
} from '@ptg/predictions-feature-prediction';
import { PredictionPdfComponent } from '@ptg/predictions-feature-prediction-pdf';

export const routes: Routes = [
  {
    path: '',
    component: PredictionsListComponent,
  },
  {
    path: 'creator',
    component: PredictionCreatorStepperComponent,
  },
  {
    path: ':id',
    resolve: {
      id: (route: ActivatedRouteSnapshot) => Number(route.paramMap.get('id')),
    },
    component: PredictionDetailsComponent,
  },
  {
    path: 'export/:id',
    providers: [PredictionDetailsStore],
    resolve: {
      id: (route: ActivatedRouteSnapshot) => Number(route.paramMap.get('id')),
    },
    component: PredictionPdfComponent,
  },
];
