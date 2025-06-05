import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'ptg-articles-statistics-loading',
  template: `
    <div class="flex gap-4 justify-between items-stretch">
      <p-card class="flex-1">
        <p-skeleton width="30%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="20%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="50%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="60%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="70%" height="1rem" styleClass="mb-2" />
      </p-card>

      <p-card class="flex-1">
        <p-skeleton width="30%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="20%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="50%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="60%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="70%" height="1rem" styleClass="mb-2" />
      </p-card>

      <p-card class="flex-1">
        <p-skeleton width="30%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="20%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="50%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="60%" height="1rem" styleClass="mb-2" />
        <p-skeleton width="70%" height="1rem" styleClass="mb-2" />
      </p-card>
    </div>

    <p-card class="block mt-4">
      <p-skeleton width="100%" height="1rem" styleClass="mb-2" />
      <p-skeleton width="100%" height="1rem" styleClass="mb-2" />
      <p-skeleton width="100%" height="1rem" styleClass="mb-2" />
      <p-skeleton width="100%" height="1rem" styleClass="mb-2" />
      <p-skeleton width="100%" height="1rem" styleClass="mb-2" />

      <div class="flex gap-2">
        <p-skeleton class="w-1/3" height="4rem" />
        <p-skeleton class="w-1/3" height="4rem" />
        <p-skeleton class="w-1/3" height="4rem" />
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Skeleton],
})
export class ArticlesStatisticsLoadingComponent {}
