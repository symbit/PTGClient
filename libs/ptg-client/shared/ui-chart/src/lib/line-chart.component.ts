import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChild,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { chartOptions, mergeChartOptions } from '@ptg/shared-utils';
import { Button } from 'primeng/button';
import { NgStyle } from '@angular/common';

type ZoomPosition = 'top-left' | 'top-right' | 'right-top' | 'right-bottom';

@Component({
  selector: 'ptg-line-chart',
  template: `
    @if (showZoomControls()) {
      <div
        class="flex absolute"
        [class.right-top]="zoomPosition() === 'right-top'"
        [class.right-bottom]="zoomPosition() === 'right-bottom'"
        [class.top-left]="zoomPosition() === 'top-left'"
        [class.top-right]="zoomPosition() === 'top-right'"
      >
        <p-button
          icon="pi pi-search-plus"
          [rounded]="true"
          [text]="true"
          (click)="zoomIn()"
        />
        <p-button
          icon="pi pi-search-minus"
          [rounded]="true"
          [text]="true"
          (click)="zoomOut()"
        />
        <p-button
          icon="pi pi-expand"
          [rounded]="true"
          [text]="true"
          (click)="resetZoom()"
        />
      </div>
    }

    @if (data(); as data) {
      <div class="flex w-full">
        <div
          [ngStyle]="{
            width: options().plugins.htmlLegend?.containerID
              ? 'calc(100% - 9rem)'
              : '100%',
          }"
        >
          <canvas baseChart type="line" [data]="data" [options]="options()">
          </canvas>
        </div>

        @if (options().plugins.htmlLegend?.containerID) {
          <div
            class="w-32"
            [id]="options().plugins.htmlLegend?.containerID"
          ></div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      position: relative;
    }

    .right-top {
      flex-direction: column;
      right: -20px;
      top: 0;
    }

    .right-bottom {
      flex-direction: column;
      right: -20px;
      bottom: 0;
    }

    .top-left {
      top: -40px;
      left: 0;
    }

    .top-right {
      top: -40px;
      right: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective, Button, NgStyle],
})
export class LineChartComponent implements AfterContentChecked {
  readonly chart = viewChild(BaseChartDirective);

  readonly data = input.required<ChartData | null>();
  readonly overrideOptions = input<ChartOptions>();
  readonly showZoomControls = input<boolean>(true);
  readonly zoomPosition = input<ZoomPosition>('right-top');

  readonly options = computed(() => {
    const overrideOptions = this.overrideOptions();

    return overrideOptions
      ? mergeChartOptions(chartOptions, overrideOptions)
      : chartOptions;
  });

  ngAfterContentChecked(): void {
    this.chart()?.update();
  }

  zoomIn(): void {
    this.chart()?.chart?.zoom(1.2);
  }

  zoomOut(): void {
    this.chart()?.chart?.zoom(0.8);
  }

  resetZoom(): void {
    this.chart()?.chart?.resetZoom();
  }
}
