import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'ptg-indicators-list-loading',
  template: `
    <p-skeleton height="10rem" styleClass="mb-2" />
    <p-skeleton height="10rem" styleClass="mb-2" />
    <p-skeleton height="10rem" styleClass="mb-2" />
    <p-skeleton height="10rem" styleClass="mb-2" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton],
})
export class IndicatorsListLoadingComponent {}
