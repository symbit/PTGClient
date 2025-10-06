import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Card } from 'primeng/card';
import { Chart, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NumberOfArticlesBySource } from '@ptg/articles-types';
import { EmptyStateComponent } from '@ptg/shared-ui-empty-state';

Chart.register(ChartDataLabels);

@Component({
  selector: 'ptg-source-statistics',
  templateUrl: './source-statistics.component.html',
  styleUrl: './source-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective, Card, EmptyStateComponent],
})
export class SourceStatisticsComponent {
  readonly numberOfArticlesBySource =
    input.required<NumberOfArticlesBySource | null>();

  readonly chartData = computed(() => {
    const numberOfArticlesBySource = this.numberOfArticlesBySource();

    if (!numberOfArticlesBySource) return;

    return {
      labels: [
        'Business Insider',
        'PAP',
        'Bankier.pl',
        'Money.pl',
        '300Gospodarka.pl',
        'wGospodarce.pl',
        'Mam biznes',
      ],
      datasets: [
        {
          data: [
            numberOfArticlesBySource.BusinessInsider,
            numberOfArticlesBySource.PAP,
            numberOfArticlesBySource['Bankier.pl'],
            numberOfArticlesBySource['Money.pl'],
            numberOfArticlesBySource['300Gospodarka.pl'],
            numberOfArticlesBySource['wGospodarce.pl'],
            numberOfArticlesBySource['Mambiznes'],
          ],
          backgroundColor: '#cce5ff',
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
