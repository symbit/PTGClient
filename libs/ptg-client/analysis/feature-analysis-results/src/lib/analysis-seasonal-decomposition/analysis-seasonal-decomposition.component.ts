import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { chartOptions } from '@ptg/shared-utils';
import { SeasonalDecomposition } from '@ptg/analysis-types';

@Component({
  selector: 'ptg-analysis-seasonal-decomposition',
  imports: [BaseChartDirective],
  template: `
    <div>
      <h2 class="header-style-18">Trend</h2>
      <canvas
        class="mt-4"
        baseChart
        type="line"
        [options]="trendChartOptions"
        [data]="trendChartData()"
      >
      </canvas>
    </div>

    <div class="mt-12">
      <h2 class="header-style-18">Składowa sezonowa</h2>
      <canvas
        class="mt-4"
        baseChart
        type="line"
        [options]="seasonalChartOptions"
        [data]="seasonalChartData()"
      >
      </canvas>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class AnalysisSeasonalDecompositionComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly seasonalDecomposition = input.required<SeasonalDecomposition>();

  readonly trendChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        title: {
          display: true,
          text: 'Trend',
        },
      },
    },
  };

  readonly seasonalChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        title: {
          display: true,
          text: 'Sezonowość',
        },
      },
    },
  };

  readonly trendChartData = computed(() => {
    const seasonalDecomposition = this.seasonalDecomposition();

    return {
      labels: seasonalDecomposition.dates.map((date) =>
        this._datePipe.transform(date, 'MM.yyyy'),
      ),
      datasets: [
        {
          data: seasonalDecomposition.trendComponent,
          pointRadius: 2,
          borderColor: '#D0332E',
        },
      ],
    };
  });

  readonly seasonalChartData = computed(() => {
    const seasonalDecomposition = this.seasonalDecomposition();

    return {
      labels: seasonalDecomposition.dates.map((date) =>
        this._datePipe.transform(date, 'MM.yyyy'),
      ),
      datasets: [
        {
          data: seasonalDecomposition.seasonalComponent,
          pointRadius: 2,
          borderColor: '#D0332E',
        },
      ],
    };
  });
}
