import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'ptg-indicator-search-loading',
  template: `
    @for (i of skeletonRows; track $index) {
      <div class="flex items-center mb-4">
        <p-skeleton shape="circle" size="20px" class="mr-2" />
        <p-skeleton width="200px" height="20px" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton],
})
export class IndicatorSearchLoadingComponent {
  readonly skeletonRows = Array(5).fill({});
}
