import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { PacfAnalysis } from '@ptg/analysis-types';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { circleTipPlugin } from '@ptg/shared-utils';

Chart.register(circleTipPlugin);

@Component({
  selector: 'ptg-analysis-partial-autocorrelation-chart',
  template: `
    <canvas class="mt-4" baseChart [options]="options" [data]="chartData()">
    </canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
})
export class AnalysisPartialAutocorrelationChartComponent {
  readonly pacfAnalysis = input.required<PacfAnalysis>();

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
    },
  };

  readonly chartData = computed(() => {
    const pacfAnalysis = this.pacfAnalysis();

    return {
      labels: pacfAnalysis.pacf.map((_, i) => i),
      datasets: [
        {
          type: 'bar',
          data: pacfAnalysis.pacf,
          backgroundColor: '#18366C',
          barThickness: 2,
          borderSkipped: false,
          barPercentage: 0.3,
          categoryPercentage: 1.0,
        },
        {
          type: 'line',
          data: pacfAnalysis.pacfLowerCi,
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: false,
          tension: 0,
          tooltip: {
            enabled: false,
          },
        },
        {
          type: 'line',
          data: pacfAnalysis.pacfUpperCi,
          backgroundColor: 'rgb(24, 54, 108, 0.1)',
          borderColor: 'transparent',
          pointRadius: 0,
          fill: '-1',
          tension: 0,
          tooltip: {
            enabled: false,
          },
        },
      ],
    };
  });
}
