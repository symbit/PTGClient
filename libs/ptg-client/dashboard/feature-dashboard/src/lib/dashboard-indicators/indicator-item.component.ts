import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Indicator } from '@ptg/indicators-types';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ptg-indicator-item',
  template: ` <div
    class="rounded-md border border-neutral-300 p-2 flex justify-between items-center "
  >
    <div class="flex items-center gap-2">
      <p>{{ indicator().name }}</p>
      <p class="whitespace-nowrap">
        {{ indicator().nextExecutionDate | date: 'dd.MM.yyyy HH:mm' }}
      </p>
    </div>

    <p-button
      icon="pi pi-arrow-right"
      [rounded]="true"
      [text]="true"
      [routerLink]="['/indicators', indicator().id]"
    />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, DatePipe, RouterLink],
})
export class IndicatorItemComponent {
  readonly indicator = input.required<Indicator>();
}
