import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Card } from 'primeng/card';
import { LineChartComponent } from '@ptg/shared-ui-chart';
import { ChartData, ChartOptions } from 'chart.js';
import { RealizationData } from '@ptg/indicators-types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ptg-indicator-realization-data-chart',
  template: `
    <p-card>
      <ng-template #title>
        <h2 class="header-style-22">Wykres danych wskaźnika</h2>
      </ng-template>
      <ptg-line-chart
        [data]="chartData()"
        [showZoomControls]="false"
        [overrideOptions]="options()"
      />
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, LineChartComponent],
  providers: [DatePipe],
})
export class IndicatorRealizationDataChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly realizationData = input.required<RealizationData[]>();
  readonly unit = input.required<string>();

  readonly options = computed<ChartOptions>(() => {
    return {
      scales: {
        y: {
          title: {
            display: true,
            text: this.unit(),
          },
        },
      },
    };
  });

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
