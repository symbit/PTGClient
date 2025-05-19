import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Card } from 'primeng/card';
import { NumberOfArticlesBySentiment } from '@ptg/articles-types';
import { ChartOptions, LegendItem } from 'chart.js';

@Component({
  selector: 'ptg-sentiment-statistics',
  imports: [BaseChartDirective, Card],
  templateUrl: './sentiment-statistics.component.html',
  styleUrl: './sentiment-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class SentimentStatisticsComponent {
  readonly totalNumberOfArticles = input.required<number>();
  readonly numberOfArticlesBySentiment =
    input.required<NumberOfArticlesBySentiment | null>();

  protected readonly options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
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
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return (
              chart.data.labels?.map((label: string, i: number) => {
                const numberOfArticlesByRelevancy =
                  this.numberOfArticlesBySentiment();

                if (!numberOfArticlesByRelevancy) return;

                const { positive, neutral, negative } =
                  numberOfArticlesByRelevancy;

                let percentage = '';

                if (label === 'Pozytywny') {
                  percentage =
                    this._decimalPipe
                      .transform(
                        (positive / this.totalNumberOfArticles()) * 100,
                        '1.0-0',
                      )
                      ?.toString() || '';
                }

                if (label === 'Neutralny') {
                  percentage =
                    this._decimalPipe
                      .transform(
                        (neutral / this.totalNumberOfArticles()) * 100,
                        '1.0-0',
                      )
                      ?.toString() || '';
                }

                if (label === 'Negatywny') {
                  percentage =
                    this._decimalPipe
                      .transform(
                        (negative / this.totalNumberOfArticles()) * 100,
                        '1.0-0',
                      )
                      ?.toString() || '';
                }

                return {
                  text: `${label}: (${percentage}%)`,
                  fillStyle:
                    datasets[0].backgroundColor instanceof Array
                      ? (datasets[0].backgroundColor[i] as string)
                      : (datasets[0].backgroundColor as string),
                  index: i,
                  borderRadius: 5,
                };
              }) || []
            );
          },
        },
      },
    },
  };

  readonly chartData = computed(() => {
    const numberOfArticlesBySentiment = this.numberOfArticlesBySentiment();

    if (!numberOfArticlesBySentiment) return;

    return {
      labels: ['Pozytywny', 'Neutralny', 'Negatywny'],
      datasets: [
        {
          data: [
            numberOfArticlesBySentiment.positive,
            numberOfArticlesBySentiment.neutral,
            numberOfArticlesBySentiment.negative,
          ],
          backgroundColor: ['#35c75a', '#0a84ff', '#ff3b2f'],
        },
      ],
    };
  });

  private readonly _decimalPipe = inject(DecimalPipe);
}
