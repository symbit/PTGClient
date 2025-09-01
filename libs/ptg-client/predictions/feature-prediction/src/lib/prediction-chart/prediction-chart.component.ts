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
      <ptg-line-chart
        [data]="chartData()"
        [showZoomControls]="showZoomControls()"
      />
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
  readonly frequency = input.required<'monthly' | 'quarterly' | 'yearly'>();
  readonly showZoomControls = input(true);

  readonly chartData = computed<ChartData>(() => {
    const analysisResults = this.analysisResults();
    // always take last 2 years of data to show on chart
    const numberOfPreviousValuesToShow = this._getLastTwoYearsDataPoints();

    return {
      labels: [
        // display only the latest 2 years elements from the raw data
        ...analysisResults.rawTimeSeries.dates.slice(
          -numberOfPreviousValuesToShow,
        ),
        ...analysisResults.forecast.dates,
      ].map((date) => this._datePipe.transform(date, 'MM.yyyy')),
      datasets: [
        {
          data: [
            ...analysisResults.rawTimeSeries.values.slice(
              -numberOfPreviousValuesToShow,
            ),
            ...analysisResults.forecast.values,
          ],
          pointRadius: 2,
          borderColor: '#D0332E',
        },
        // przedziały ufności
        {
          data: [
            ...analysisResults.rawTimeSeries.values
              .slice(-numberOfPreviousValuesToShow)
              .map(() => null),
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
            ...analysisResults.rawTimeSeries.values
              .slice(-numberOfPreviousValuesToShow)
              .map(() => null),
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

  private _getLastTwoYearsDataPoints() {
    switch (this.frequency()) {
      case 'monthly':
        return 24;
      case 'quarterly':
        return 8;
      case 'yearly':
        return 2;
      default:
        return 24;
    }
  }
}
