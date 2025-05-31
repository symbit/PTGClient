import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardArticlesComponent } from '../dashboard-articles/dashboard-articles.component';
import { DashboardPredictionsComponent } from '../dashboard-predictions/dashboard-predictions.component';
import { DashboardIndicatorsComponent } from '../dashboard-indicators/dashboard-indicators.component';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ptg-dashboard',
  template: `
    <p-card header="Akcje" class="w-1/2">
      <div class="flex gap-2">
        <p-button
          class="w-1/2"
          styleClass="w-full"
          label="Nowa prognoza"
          icon="pi pi-chart-line"
          severity="secondary"
          routerLink="/predictions/creator"
        />

        <p-button
          class="w-1/2"
          styleClass="w-full"
          label="Nowa analiza wskaźnika"
          icon="pi pi-caret-right"
          severity="secondary"
          routerLink="/analysis"
        />
      </div>
    </p-card>
    <div class="flex items-stretch gap-4">
      <ptg-dashboard-indicators class="block w-1/2" />
      <ptg-dashboard-predictions class="block w-1/2" />
    </div>

    <ptg-dashboard-articles />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardArticlesComponent,
    DashboardPredictionsComponent,
    DashboardIndicatorsComponent,
    Card,
    Button,
    RouterLink,
  ],
})
export class DashboardComponent {}
