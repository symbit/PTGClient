import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Card } from 'primeng/card';
import { NumberOfArticlesByRelevancy } from '@ptg/articles-types';
import { ChartData, ChartOptions, LegendItem } from 'chart.js';
import { DecimalPipe } from '@angular/common';
import { DoughnutChartComponent } from '@ptg/shared-ui-chart';

@Component({
  selector: 'ptg-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrl: './general-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, DoughnutChartComponent],
  providers: [DecimalPipe],
})
export class GeneralStatisticsComponent {
  readonly totalNumberOfArticles = input.required<number>();
  readonly numberOfArticlesByRelevancy =
    input.required<NumberOfArticlesByRelevancy | null>();

  protected readonly options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'center',
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
                  this.numberOfArticlesByRelevancy();

                if (!numberOfArticlesByRelevancy) return;

                const labelercentage = this._decimalPipe.transform(
                  ((label === 'Relevant'
                    ? numberOfArticlesByRelevancy.true
                    : numberOfArticlesByRelevancy.false) /
                    this.totalNumberOfArticles()) *
                    100,
                  '1.0-0',
                );

                return {
                  text: `${label}: ${
                    label === 'Relevant'
                      ? numberOfArticlesByRelevancy.true
                      : numberOfArticlesByRelevancy.false
                  } (${labelercentage}%) `,
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

  readonly chartData = computed<ChartData | null>(() => {
    const numberOfArticlesByRelevancy = this.numberOfArticlesByRelevancy();

    if (!numberOfArticlesByRelevancy) return null;

    return {
      labels: ['Relevant', 'Irrelevant'],
      datasets: [
        {
          data: [
            numberOfArticlesByRelevancy.true,
            numberOfArticlesByRelevancy.false,
          ],
          backgroundColor: ['#35c75a', '#8e8e93'],
        },
      ],
    };
  });

  private readonly _decimalPipe = inject(DecimalPipe);
}
