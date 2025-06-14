import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { Card } from 'primeng/card';
import { LineChartComponent } from '@ptg/shared-ui-chart';
import { ChartData } from 'chart.js';

@Component({
  selector: 'ptg-dashboard-job-offers-chart',
  template: `
    <p-card header="Liczba ofert pracy" styleClass="h-full">
      <ptg-line-chart
        [data]="chartData()"
        [showZoomControls]="false"
        [overrideOptions]="options"
      />
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
  imports: [Card, LineChartComponent],
})
export class DashboardJobOffersChartComponent {
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
    const lastYearJobOffers = this.state.lastYearJobOffers();

    if (!lastYearJobOffers) return null;

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
}
