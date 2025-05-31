import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Button } from 'primeng/button';
import { Prediction } from '@ptg/predictions-types';
import { PredictionPeriodPipe } from '@ptg/predictions-utils';
import { PredictionStatusPillComponent } from '@ptg/predictions-ui-prediction-status-pill';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ptg-prediction-item',
  template: ` <div
    class="rounded-md border border-neutral-300 p-2 flex justify-between items-center "
  >
    <div class="flex items-center gap-2">
      <p>{{ prediction().predictionDefinition.name }}</p>
      <p>
        {{
          prediction().nForecast
            | predictionPeriod: prediction().predictionDefinition.frequency
        }}
      </p>
    </div>
    <ptg-prediction-status-pill [status]="prediction().status" />

    <p-button
      icon="pi pi-arrow-right"
      [rounded]="true"
      [text]="true"
      [routerLink]="['/predictions', prediction().id]"
    />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    PredictionPeriodPipe,
    PredictionStatusPillComponent,
    RouterLink,
  ],
})
export class PredictionItemComponent {
  readonly prediction = input.required<Prediction>();
}
