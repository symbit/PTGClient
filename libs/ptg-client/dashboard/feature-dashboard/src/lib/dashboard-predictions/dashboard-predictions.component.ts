import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { PredictionItemComponent } from './prediction-item.component';

@Component({
  selector: 'ptg-dashboard-predictions',
  template: `
    <p-card class="block h-full" styleClass="h-full" header="Ostatnie prognozy">
      <div class="flex flex-col gap-2">
        @for (prediction of state.predictions(); track prediction) {
          <ptg-prediction-item [prediction]="prediction" />
        }
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, PredictionItemComponent],
})
export class DashboardPredictionsComponent {
  readonly state = inject(DashboardStore);
}
