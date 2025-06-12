import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AcfAnalysis } from '@ptg/analysis-types';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { circleTipPlugin } from '@ptg/shared-utils';

Chart.register(circleTipPlugin);

@Component({
  selector: 'ptg-analysis-autocorrelation-chart',
  template: `
    <canvas class="mt-4" baseChart [options]="options" [data]="chartData()">
    </canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
})
export class AnalysisAutocorrelationChartComponent {
  readonly acfAnalysis = input.required<AcfAnalysis>();

  readonly options = {
    responsive: true,
    aspectRatio: 3,
    circleTipPlugin: {
      radius: 4,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  readonly chartData = computed(() => {
    const acfAnalysis = this.acfAnalysis();

    return {
      labels: acfAnalysis.acf.map((_, i) => i),
      datasets: [
        {
          type: 'bar',
          data: acfAnalysis.acf,
          backgroundColor: '#18366C',
          barThickness: 2,
          borderSkipped: false,
          barPercentage: 0.3,
          categoryPercentage: 1.0,
        },
        {
          type: 'line',
          data: acfAnalysis.acfLowerCi,
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: false,
          tension: 0,
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: false,
          },
        },
        {
          type: 'line',
          data: acfAnalysis.acfUpperCi,
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: '-1',
          tension: 0,
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: false,
          },
        },
      ],
    };
  });
}
