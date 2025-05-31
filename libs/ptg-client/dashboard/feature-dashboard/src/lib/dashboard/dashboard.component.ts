import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardArticlesComponent } from '../dashboard-articles/dashboard-articles.component';
import { DashboardPredictionsComponent } from '../dashboard-predictions/dashboard-predictions.component';
import { DashboardIndicatorsComponent } from '../dashboard-indicators/dashboard-indicators.component';

@Component({
  selector: 'ptg-dashboard',
  template: `
    <div class="flex items-stretch gap-4">
      <ptg-dashboard-indicators class="block w-1/2" />
      <ptg-dashboard-predictions class="block w-1/2" />
    </div>

    <ptg-dashboard-articles />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardArticlesComponent,
    DashboardPredictionsComponent,
    DashboardIndicatorsComponent,
  ],
})
export class DashboardComponent {}
