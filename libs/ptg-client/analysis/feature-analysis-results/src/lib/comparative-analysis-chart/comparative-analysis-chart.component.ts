import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { Card } from 'primeng/card';
import { ComparativeAnalysisChart } from '@ptg/analysis-types';
import { LineChartComponent } from '@ptg/shared-ui-chart';

@Component({
  selector: 'ptg-comparative-analysis-chart',
  templateUrl: './comparative-analysis-chart.component.html',
  styleUrl: './comparative-analysis-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, LineChartComponent],
  providers: [DatePipe],
})
export class ComparativeAnalysisChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly comparativeAnalysisChart =
    input.required<ComparativeAnalysisChart>();

  readonly options: ChartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  readonly chartData = computed(() => {
    const comparativeAnalysisChart = this.comparativeAnalysisChart();

    return {
      labels: comparativeAnalysisChart.labels.map((date) =>
        this._datePipe.transform(date, 'MM.yyyy'),
      ),
      datasets: [
        {
          ...comparativeAnalysisChart.datasets[0],
          yAxisID: 'y',
          pointRadius: 2,
          borderColor: '#D0332E',
        },
        {
          ...comparativeAnalysisChart.datasets[1],
          yAxisID: 'y1',
          pointRadius: 2,
          borderColor: '#18366C',
        },
      ],
    };
  });
}
