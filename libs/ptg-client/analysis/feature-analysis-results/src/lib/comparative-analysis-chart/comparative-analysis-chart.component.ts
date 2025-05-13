import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { ChartOptions, LegendItem } from 'chart.js';
import { Card } from 'primeng/card';
import { ComparativeAnalysisChart } from '@ptg/analysis-types';

@Component({
  selector: 'ptg-comparative-analysis-chart',
  templateUrl: './comparative-analysis-chart.component.html',
  styleUrl: './comparative-analysis-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective, Card],
  providers: [DatePipe],
})
export class ComparativeAnalysisChartComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly comparativeAnalysisChart =
    input.required<ComparativeAnalysisChart>();

  readonly options: ChartOptions = {
    responsive: true,
    aspectRatio: 3,
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
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'start',
        onClick: () => null,
        labels: {
          filter: (legendItem: LegendItem) => {
            return !!legendItem.text;
          },
          useBorderRadius: true,
          borderRadius: 5,
          boxWidth: 10,
          boxHeight: 10,
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
