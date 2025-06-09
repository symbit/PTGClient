import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { Card } from 'primeng/card';
import { chartOptions } from '@ptg/shared-utils';

@Component({
  selector: 'ptg-dashboard-job-offers-chart',
  template: `
    <p-card header="Liczba ofert pracy" styleClass="h-full">
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
  providers: [DatePipe],
  imports: [BaseChartDirective, Card],
})
export class DashboardJobOffersChartComponent {
  readonly state = inject(DashboardStore);
  readonly _datePipe = inject(DatePipe);

  readonly chartData = computed(() => {
    const lastYearJobOffers = this.state.lastYearJobOffers();

    if (!lastYearJobOffers) return;

    return {
      labels: lastYearJobOffers.pracujpl.map(({ date }) =>
        this._datePipe.transform(date, 'MM.yyyy'),
      ),
      datasets: [
        {
          data: lastYearJobOffers.pracujpl.map(({ value }) => value),
          label: 'Pracuj.pl',
          pointRadius: 2,
          borderColor: '#D0332E',
        },
        {
          data: lastYearJobOffers.gowork.map(({ value }) => value),
          label: 'GoWork',
          pointRadius: 2,
          borderColor: '#18366C',
        },
        {
          data: lastYearJobOffers.cbop.map(({ value }) => value),
          label: 'CBOP',
          pointRadius: 2,
          borderColor: '#878D96',
        },
      ],
    };
  });
  readonly options = chartOptions;
}
