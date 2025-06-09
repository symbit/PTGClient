import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Card } from 'primeng/card';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { chartOptions } from '@ptg/shared-utils';

@Component({
  selector: 'ptg-dashboard-unemployment-rate-chart',
  template: `
    <p-card header="Stopa bezrobocia rejestrowanego" styleClass="h-full">
      <canvas
        baseChart
        [type]="'line'"
        [data]="chartData()"
        [options]="options"
      >
      </canvas>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective, Card],
  providers: [DatePipe],
})
export class DashboardUnemploymentRateChartComponent {
  readonly state = inject(DashboardStore);
  readonly _datePipe = inject(DatePipe);

  readonly chartData = computed(() => {
    const unemploymentRateData = this.state.unemploymentRateData();

    if (!unemploymentRateData) return;

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
  readonly options = chartOptions;
}
