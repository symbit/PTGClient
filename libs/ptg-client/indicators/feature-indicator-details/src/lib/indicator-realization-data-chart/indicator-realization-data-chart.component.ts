import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Card } from 'primeng/card';
import { LineChartComponent } from '@ptg/shared-ui-chart';
import { ChartData } from 'chart.js';
import { RealizationData } from '@ptg/indicators-types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ptg-indicator-realization-data-chart',
  template: `
    <p-card>
      <ng-template #title>
        <h2 class="header-style-22">Wykres danych wskaźnika</h2>
      </ng-template>
      <ptg-line-chart [data]="chartData()" [showZoomControls]="false" />
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, LineChartComponent],
  providers: [DatePipe],
})
export class IndicatorRealizationDataChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly realizationData = input.required<RealizationData[]>();

  readonly chartData = computed<ChartData>(() => {
    const data = this.realizationData();

    return {
      labels: data
        .map((item) => item.date)
        .map((date) => this._datePipe.transform(date, 'MM.yyyy')),
      datasets: [
        {
          data: data.map((item) => item.value),
          pointRadius: 2,
          borderColor: '#D0332E',
        },
      ],
    };
  });
}
