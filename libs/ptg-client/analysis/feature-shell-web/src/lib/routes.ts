import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AnalysisCreatorWrapperComponent } from '@ptg/analysis-feature-analysis-creator';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { AnalysisResultsComponent } from '@ptg/analysis-feature-analysis-results';
import { pendingChangesGuard } from '@ptg/shared-utils';
import { DialogService } from 'primeng/dynamicdialog';
import { AnalysisStore } from '@ptg/analysis-data-access-analysis';

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
    providers: [DialogService],
    canActivate: [
      () => {
        const router = inject(Router);
        const analysis = inject(AnalysisStore).analysis();

        if (!analysis) router.navigate(['/analysis']);

        return true;
      },
    ],
    canDeactivate: [pendingChangesGuard],
    component: AnalysisResultsComponent,
  },
];
