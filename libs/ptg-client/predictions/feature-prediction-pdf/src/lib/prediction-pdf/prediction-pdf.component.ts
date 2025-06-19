import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { LineChartComponent } from '@ptg/shared-ui-chart';
import { ChartData } from 'chart.js';
import { DatePipe, DecimalPipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { PredictionDetailsStore } from '@ptg/predictions-data-access-predictions';
import { AuthStore } from '@ptg/auth-data-access-auth';

@Component({
  selector: 'ptg-prediction-pdf',
  imports: [LineChartComponent, DatePipe, DecimalPipe, TableModule],
  templateUrl: './prediction-pdf.component.html',
  styleUrl: './prediction-pdf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, PredictionDetailsStore],
})
export class PredictionPdfComponent implements AfterViewInit {
  private readonly _datePipe = inject(DatePipe);

  readonly id = input<number>();
  readonly state = inject(PredictionDetailsStore);
  readonly authStore = inject(AuthStore);

  readonly chartData = computed<ChartData | null>(() => {
    const analysisResults = this.state.prediction()?.analysisResults;

    if (!analysisResults) return null;

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

  ngAfterViewInit(): void {
    this.state.loadPrediction(this.id() || 0);
  }
}
