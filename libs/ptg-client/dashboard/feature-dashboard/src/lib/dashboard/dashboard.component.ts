import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardArticlesComponent } from '../dashboard-articles/dashboard-articles.component';
import { DashboardPredictionsComponent } from '../dashboard-predictions/dashboard-predictions.component';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DashboardJobOffersComponent } from '../dashboard-job-offers/dashboard-job-offers.component';
import { DashboardJobOffersChartComponent } from '../dashboard-job-offers-chart/dashboard-job-offers-chart.component';
import { DashboardUnemploymentRateChartComponent } from '../dashboard-unemployment-rate-chart/dashboard-unemployment-rate-chart.component';
import { DashboardLoadingComponent } from './dashboard-loading.component';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';

@Component({
  selector: 'ptg-dashboard',
  template: `
    @if (!state.isLoading()) {
      <div class="flex items-stretch gap-4">
        <ptg-dashboard-job-offers class="block w-1/2" />
        <p-card header="Akcje" styleClass="h-full" class="w-1/2">
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
      </div>

      <div class="flex items-stretch gap-4">
        <ptg-dashboard-job-offers-chart class="block w-1/2" />
        <ptg-dashboard-unemployment-rate-chart class="block w-1/2" />
      </div>

      <div class="flex items-stretch gap-4">
        <ptg-dashboard-articles class="block w-1/2" />
        <ptg-dashboard-predictions class="block w-1/2" />
      </div>
    } @else {
      <ptg-dashboard-loading />
    }
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
    Card,
    Button,
    RouterLink,
    DashboardJobOffersComponent,
    DashboardJobOffersChartComponent,
    DashboardUnemploymentRateChartComponent,
    DashboardLoadingComponent,
  ],
})
export class DashboardComponent {
  readonly state = inject(DashboardStore);
}
