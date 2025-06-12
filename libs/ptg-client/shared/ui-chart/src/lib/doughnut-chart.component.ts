import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ptg-doughnut-chart',
  template: ` @if (data(); as data) {
    <canvas baseChart type="doughnut" [data]="data" [options]="options()">
    </canvas>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
})
export class DoughnutChartComponent {
  readonly data = input.required<ChartData | null>();
  readonly options = input.required<ChartOptions>();
}
