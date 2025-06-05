import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Card } from 'primeng/card';

@Component({
  selector: 'ptg-indicator-details-loading',
  template: `
    <p-card>
      <div class="w-1/2">
        <p-skeleton height="1rem" styleClass="mb-2" />
        <p-skeleton styleClass="mb-2 !w-2/3" />

        <div class="mt-4">
          <p-skeleton styleClass="mb-2 !w-1/3" />
          <p-skeleton styleClass="mb-2 !w-1/4" />
        </div>

        <div class="mt-4">
          <p-skeleton styleClass="mb-2 !w-1/3" />
          <p-skeleton styleClass="mb-2 !w-1/4" />
        </div>

        <div class="mt-4">
          <p-skeleton styleClass="mb-2 !w-1/3" />
          <p-skeleton styleClass="mb-2 !w-1/4" />
        </div>
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton, Card],
})
export class IndicatorDetailsLoadingComponent {}
