import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { IndicatorItemComponent } from './indicator-item.component';

@Component({
  selector: 'ptg-dashboard-indicators',
  template: `
    <p-card header="Aktualizacja wskaźników">
      <div class="flex flex-col gap-2">
        @for (indicator of state.indicators(); track indicator) {
          <ptg-indicator-item [indicator]="indicator" />
        }
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, IndicatorItemComponent],
})
export class DashboardIndicatorsComponent {
  readonly state = inject(DashboardStore);
}
