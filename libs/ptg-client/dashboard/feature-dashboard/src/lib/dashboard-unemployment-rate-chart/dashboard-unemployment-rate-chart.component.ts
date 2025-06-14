import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Card } from 'primeng/card';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { LineChartComponent } from '@ptg/shared-ui-chart';
import { ChartData } from 'chart.js';

@Component({
  selector: 'ptg-dashboard-unemployment-rate-chart',
  template: `
    <p-card header="Stopa bezrobocia rejestrowanego" styleClass="h-full">
      <ptg-line-chart
        [data]="chartData()"
        [showZoomControls]="false"
        [overrideOptions]="options"
      />
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, LineChartComponent],
  providers: [DatePipe],
})
export class DashboardUnemploymentRateChartComponent {
  readonly state = inject(DashboardStore);
  readonly _datePipe = inject(DatePipe);

  readonly options = {
    plugins: {
      zoom: {
        pan: {
          enabled: false,
        },
        zoom: {
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: false,
          },
        },
      },
    },
  };

  readonly chartData = computed<ChartData | null>(() => {
    const unemploymentRateData = this.state.unemploymentRateData();

    if (!unemploymentRateData) return null;

    return {
      labels: unemploymentRateData.map(({ date }) =>
        this._datePipe.transform(date, 'MM.yyyy'),
      ),
      datasets: [
        {
          data: unemploymentRateData.map(({ value }) => value),
          pointRadius: 2,
          borderColor: '#D0332E',
        },
      ],
    };
  });
}
