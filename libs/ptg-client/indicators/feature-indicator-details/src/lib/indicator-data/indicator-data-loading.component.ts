import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Skeleton } from 'primeng/skeleton';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'ptg-indicator-data-loading',
  template: `
    <p-card>
      <div class="flex gap-2">
        <div class="w-1/3">
          <p-skeleton height="2rem" />
        </div>
        <div class="w-1/3">
          <p-skeleton height="2rem" />
        </div>
        <div class="w-1/3">
          <p-skeleton height="2rem" />
        </div>
      </div>
    </p-card>

    <p-card class="block mt-4">
      <p-skeleton height="1rem" styleClass="!w-1/3 mb-4" />

      <p-table [value]="skeletonRows">
        <ng-template pTemplate="header">
          <tr>
            <th><p-skeleton width="5rem" height="1rem" /></th>
            <th><p-skeleton width="5rem" height="1rem" /></th>
            <th><p-skeleton width="5rem" height="1rem" /></th>
            <th><p-skeleton width="5rem" height="1rem" /></th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row>
          <tr>
            <td><p-skeleton width="5rem" height="1rem" /></td>
            <td><p-skeleton width="7rem" height="1rem" /></td>
            <td><p-skeleton width="10rem" height="1rem" /></td>
            <td><p-skeleton width="2rem" height="1rem" /></td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton, Card, TableModule],
})
export class IndicatorDataLoadingComponent {
  skeletonRows = Array(10).fill({});
}
