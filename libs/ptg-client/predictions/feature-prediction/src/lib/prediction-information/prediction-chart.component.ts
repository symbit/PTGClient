import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { chartOptions } from '@ptg/shared-utils';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { PredictionAnalysisResults } from '@ptg/predictions-types';

@Component({
  selector: 'ptg-prediction-chart',
  template: `
    <canvas baseChart [type]="'line'" [data]="chartData()" [options]="options">
    </canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  providers: [DatePipe],
})
export class PredictionChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly analysisResults = input.required<PredictionAnalysisResults>();

  readonly options = chartOptions;

  readonly chartData = computed(() => {
    const analysisResults = this.analysisResults();

    return {
      labels: [
        ...analysisResults.rawTimeSeries.dates,
        ...analysisResults.forecast.dates,
      ].map((date) => this._datePipe.transform(date, 'MM.yyyy')),
      datasets: [
        {
          data: [
            ...analysisResults.rawTimeSeries.values,
            ...analysisResults.forecast.values,
          ],
          pointRadius: 2,
          borderColor: '#D0332E',
          segment: {
            borderDash: (ctx: any) => {
              return ctx.p0DataIndex >=
                analysisResults.rawTimeSeries.values.length
                ? [6, 6]
                : undefined;
            },
          },
        },
        // przedziały ufności
        {
          data: [
            ...analysisResults.rawTimeSeries.values.map(() => null),
            ...analysisResults.forecast.predictionLowerCi,
          ],
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: 0,
          tension: 0,
        },
        {
          data: [
            ...analysisResults.rawTimeSeries.values.map(() => null),
            ...analysisResults.forecast.predictionUpperCi,
          ],
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: 0,
          tension: 0,
        },
      ],
    };
  });
}
