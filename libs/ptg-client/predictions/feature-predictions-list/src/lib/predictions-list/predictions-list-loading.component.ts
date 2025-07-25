import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'ptg-predictions-list-loading',
  template: ` <p-table [value]="skeletonRows">
    <ng-template pTemplate="body" let-row>
      <tr class="h-16">
        <td>
          <p-skeleton width="5rem" height="1rem" />
        </td>
        <td>
          <p-skeleton width="7rem" height="1rem" />
        </td>
        <td>
          <p-skeleton width="10rem" height="1rem" />
        </td>
        <td>
          <p-skeleton width="2rem" height="1rem" />
        </td>
        <td>
          <p-skeleton width="5rem" height="1rem" />
        </td>
        <td>
          <p-skeleton width="7rem" height="1rem" />
        </td>
      </tr>
    </ng-template>
  </p-table>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PrimeTemplate, Skeleton, TableModule],
})
export class PredictionsListLoadingComponent {
  skeletonRows = Array(10).fill({});
}
