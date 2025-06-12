import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { SeasonalDecomposition } from '@ptg/analysis-types';
import { LineChartComponent } from '@ptg/shared-ui-chart';

@Component({
  selector: 'ptg-analysis-seasonal-decomposition',
  imports: [LineChartComponent],
  template: `
    <div>
      <h2 class="header-style-18">Trend</h2>
      <ptg-line-chart
        class="block mt-4"
        [data]="trendChartData()"
        [overrideOptions]="trendChartOptions"
      />
    </div>

    <div class="mt-12">
      <h2 class="header-style-18">Składowa sezonowa</h2>
      <ptg-line-chart
        class="block mt-4"
        [data]="seasonalChartData()"
        [overrideOptions]="seasonalChartOptions"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class AnalysisSeasonalDecompositionComponent {
  private readonly _datePipe = inject(DatePipe);

  readonly seasonalDecomposition = input.required<SeasonalDecomposition>();
  readonly trendChartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Trend',
        },
      },
    },
  };

  readonly seasonalChartOptions = {
    scales: {
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
