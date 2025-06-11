import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Button } from 'primeng/button';
import { Prediction } from '@ptg/predictions-types';
import { PredictionPeriodPipe } from '@ptg/predictions-utils';
import { PredictionStatusPillComponent } from '@ptg/predictions-ui-prediction-status-pill';
import { RouterLink } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'ptg-prediction-item',
  template: ` <div
    class="rounded-md border border-neutral-300 p-2 flex justify-between items-center gap-2"
  >
    <div class="flex items-center gap-2 w-[70%]">
      <p
        [pTooltip]="prediction().predictionDefinition.name"
        tooltipPosition="top"
        class="w-3/4 overflow-ellipsis overflow-hidden text-nowrap"
      >
        {{ prediction().predictionDefinition.name }}
      </p>
      <p class="text-nowrap ">
        {{
          prediction().nForecast
            | predictionPeriod: prediction().predictionDefinition.frequency
        }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <ptg-prediction-status-pill [status]="prediction().status" />

      <p-button
        icon="pi pi-arrow-right"
        [rounded]="true"
        [text]="true"
        [routerLink]="['/predictions', prediction().id]"
      />
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    PredictionPeriodPipe,
    PredictionStatusPillComponent,
    RouterLink,
    Tooltip,
  ],
})
export class PredictionItemComponent {
  readonly prediction = input.required<Prediction>();
  protected readonly top = top;
}
