import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Card } from 'primeng/card';

@Component({
  selector: 'ptg-user-details-loading',
  template: `
    <p-card>
      <p-skeleton class="block w-1/4" height="1rem" styleClass="mb-2" />

      <div class="flex gap-2 w-1/3">
        <p-skeleton class="flex-1" height="3rem" styleClass="mb-2" />
        <p-skeleton class="flex-1" height="3rem" styleClass="mb-2" />
      </div>

      <p-skeleton class="block w-1/3" height="3rem" styleClass="mb-2" />
      <p-skeleton class="block w-1/3" height="3rem" styleClass="mb-2" />
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton, Card],
})
export class UserDetailsLoadingComponent {}
