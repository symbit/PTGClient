import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'ptg-auth-card',
  template: `
    <p-card>
      <ng-template #header>
        <div class="text-center text-primary-100 p-4">
          <i class="!text-2xl pi pi-chart-line"></i>
          <p class="header-style-24 ml-2">System Prognostyczny</p>
        </div>
      </ng-template>

      <ng-content />
    </p-card>
  `,
  styleUrl: './auth-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card],
})
export class AuthCardComponent {}
