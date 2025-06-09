import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { Card } from 'primeng/card';

Chart.register(ChartDataLabels);

@Component({
  selector: 'ptg-dashboard-job-offers',
  template: `
    <p-card header="Liczba ofert pracy" styleClass="h-full">
      <canvas
        class="mt-4"
        baseChart
        [data]="chartData()"
        [options]="options"
        height="50"
      >
      </canvas>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective, Card],
})
export class DashboardJobOffersComponent {
  readonly state = inject(DashboardStore);
  readonly chartData = computed(() => {
    const currentJobOffers = this.state.currentJobOffers();

    if (!currentJobOffers) return;

    return {
      labels: ['Pracuj.pl', 'GoWork', 'CBOP'],
      datasets: [
        {
          data: [
            currentJobOffers.pracujPlActiveOffers,
            currentJobOffers.goworkActiveOffers,
            currentJobOffers.cbopActiveOffers,
          ],
          backgroundColor: ['#D0332E', '#18366C', '#878D96'],
          borderRadius: 10,
          barThickness: 12,
        },
      ],
    };
  });

  readonly options: ChartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          padding: 4,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 60,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#333',
        font: {
          weight: 'bold',
        },
      },
    },
  };
}
