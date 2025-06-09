import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'ptg-dashboard-loading',
  template: `
    <div class="grid gap-4">
      <div class="grid grid-cols-3 gap-4 w-full">
        <p-card class="col-span-2">
          <p-skeleton height="2rem" width="40%" class="block mb-2" />
          <div class="mt-4 space-y-2">
            <p-skeleton height="1.5rem" width="90%" class="block mb-2" />
            <p-skeleton height="1.5rem" width="70%" class="block mb-2" />
            <p-skeleton height="1.5rem" width="50%" class="block mb-2" />
          </div>
        </p-card>

        <p-card>
          <div class="flex flex-col gap-4">
            <p-skeleton height="3rem" width="100%" class="block mb-2" />
            <p-skeleton height="3rem" width="100%" class="block mb-2" />
          </div>
        </p-card>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <p-card>
          <p-skeleton height="2rem" width="50%" class="block mb-2" />
          <p-skeleton height="10rem" class="mt-4 w-full mb-2" />
        </p-card>

        <p-card>
          <p-skeleton height="2rem" width="50%" class="block mb-2" />
          <p-skeleton height="10rem" class="mt-4 w-full mb-2" />
        </p-card>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <p-card>
          <p-skeleton height="2rem" width="60%" class="block mb-2" />
          <div class="space-y-2 mt-4">
            <p-skeleton height="1.5rem" width="90%" class="block mb-2" />
            <p-skeleton height="1.5rem" width="85%" class="block mb-2" />
            <p-skeleton height="1.5rem" width="95%" class="block mb-2" />
            <p-skeleton height="1.5rem" width="80%" class="block mb-2" />
            <p-skeleton height="1.5rem" width="92%" class="block mb-2" />
          </div>
        </p-card>

        <p-card>
          <p-skeleton height="2rem" width="60%" class="block mb-2" />
          <div class="space-y-2 mt-4">
            <p-skeleton height="2rem" width="100%" class="block mb-2" />
            <p-skeleton height="2rem" width="100%" class="block mb-2" />
            <p-skeleton height="2rem" width="100%" class="block mb-2" />
            <p-skeleton height="2rem" width="100%" class="block mb-2" />
            <p-skeleton height="2rem" width="100%" class="block mb-2" />
          </div>
        </p-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton, Card],
})
export class DashboardLoadingComponent {}
