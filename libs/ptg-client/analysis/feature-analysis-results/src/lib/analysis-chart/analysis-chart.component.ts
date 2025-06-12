import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Card } from 'primeng/card';
import { ToggleSwitch } from 'primeng/toggleswitch';

import {
  AnalysisConfig,
  Forecast,
  InSamplePrediction,
} from '@ptg/analysis-types';
import { RawTimeSeries } from '@ptg/shared-types';

import { AnalysisChartConfigComponent } from '../analysis-chart-config/analysis-chart-config.component';
import { LineChartComponent } from '@ptg/shared-ui-chart';

@Component({
  selector: 'ptg-analysis-chart',
  imports: [
    AnalysisChartConfigComponent,
    Card,
    ToggleSwitch,
    FormsModule,
    LineChartComponent,
  ],
  templateUrl: './analysis-chart.component.html',
  styleUrl: './analysis-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class AnalysisChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly rawTimeSeries = input.required<RawTimeSeries>();
  readonly inSamplePrediction = input.required<InSamplePrediction>();
  readonly indicatorEma = input.required<RawTimeSeries>();
  readonly forecast = input.required<Forecast>();

  readonly configChanged = output<AnalysisConfig>();

  readonly showArima = signal<boolean>(false);
  readonly showEma = signal<boolean>(true);

  readonly chartData = computed(() => {
    const rawTimeSeries = this.rawTimeSeries();
    const inSamplePrediction = this.inSamplePrediction();
    const indicatorEma = this.indicatorEma();
    const forecast = this.forecast();

    return {
      labels: [...rawTimeSeries.dates, ...forecast.dates].map((date) =>
        this._datePipe.transform(date, 'MM.yyyy'),
      ),
      datasets: [
        // ARIMA
        {
          data: [null, ...inSamplePrediction.values, ...forecast.values],
          label: 'ARIMA',
          pointRadius: 2,
          borderColor: '#D0332E',
          segment: {
            borderDash: (ctx: any) => {
              return ctx.p0DataIndex >= inSamplePrediction.values.length
                ? [6, 6]
                : undefined;
            },
          },
          hidden: !this.showArima(),
        },
        // przedziały ufności
        {
          data: [
            null,
            ...inSamplePrediction.predictionLowerCi,
            ...forecast.predictionLowerCi,
          ],
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: 0,
          tension: 0,
          hidden: !this.showArima(),
        },
        {
          data: [
            null,
            ...inSamplePrediction.predictionUpperCi,
            ...forecast.predictionUpperCi,
          ],
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: 0,
          tension: 0,
          hidden: !this.showArima(),
        },
        // raw data
        {
          data: rawTimeSeries.values,
          label: 'Dane surowe',
          pointRadius: 2,
          borderColor: '#878D96',
        },
        // EMA
        {
          data: indicatorEma.values,
          label: 'EMA',
          pointRadius: 2,
          borderColor: '#18366C',
          hidden: !this.showEma(),
        },
      ],
    };
  });

  onArimaToggle(): void {
    this.showArima.set(!this.showArima());
  }

  onEmaToggle(): void {
    this.showEma.set(!this.showEma());
  }
}
