import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AnalysisCreatorWrapperComponent } from '@ptg/analysis-feature-analysis-creator';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { AnalysisResultsComponent } from '@ptg/analysis-feature-analysis-results';

export const routes: Routes = [
  {
    path: '',
    resolve: [
      () => {
        const state = inject(ConstantsStore);
        state.loadSources();
      },
    ],
    component: AnalysisCreatorWrapperComponent,
  },
  {
    path: 'results',
    component: AnalysisResultsComponent,
  },
];
