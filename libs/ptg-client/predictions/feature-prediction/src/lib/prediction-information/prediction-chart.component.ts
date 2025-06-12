import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { PredictionAnalysisResults } from '@ptg/predictions-types';
import { LineChartComponent } from '@ptg/shared-ui-chart';
import { Card } from 'primeng/card';
import { ChartData } from 'chart.js';

@Component({
  selector: 'ptg-prediction-chart',
  template: `
    <p-card>
      <ptg-line-chart [data]="chartData()" />
    </p-card>
  `,
  styles: `
    :host {
      --p-card-background: var(--neutral-light-200);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, LineChartComponent],
  providers: [DatePipe],
})
export class PredictionChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly analysisResults = input.required<PredictionAnalysisResults>();

  readonly chartData = computed<ChartData>(() => {
    const analysisResults = this.analysisResults();

    return {
      labels: [
        // display only the 3 latest elements from the raw data
        ...analysisResults.rawTimeSeries.dates.slice(-3),
        ...analysisResults.forecast.dates,
      ].map((date) => this._datePipe.transform(date, 'MM.yyyy')),
      datasets: [
        {
          data: [
            ...analysisResults.rawTimeSeries.values.slice(-3),
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
            ...analysisResults.rawTimeSeries.values.slice(-3).map(() => null),
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
            ...analysisResults.rawTimeSeries.values.slice(-3).map(() => null),
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
