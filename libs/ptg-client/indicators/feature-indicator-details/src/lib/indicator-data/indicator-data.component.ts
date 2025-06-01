import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { IndicatorRealizationDataComponent } from '../indicator-realization-data/indicator-realization-data.component';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import { DefaultSearchCriteria, SearchCriteria } from '@ptg/shared-types';
import { IndicatorRealizationComponent } from '@ptg/shared-feature-indicator-relization';
import { Card } from 'primeng/card';
import { Realization } from '@ptg/indicators-types';

@Component({
  selector: 'ptg-indicator-data',
  imports: [
    IndicatorRealizationComponent,
    IndicatorRealizationDataComponent,
    Card,
  ],
  template: `
    <p-card>
      <ptg-indicator-realization
        [realizations]="state.realizations()"
        [initialRealization]="selectedRealization()"
        (changeSelectedRealization)="selectedRealization.set($event)"
      />
    </p-card>

    <ptg-indicator-realization-data
      [data]="state.entities()"
      [total]="state.total()"
      [realizationId]="selectedRealization()?.id || 0"
      (loadRealizationData)="loadRealizationData($event)"
    />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorDataComponent {
  readonly state = inject(IndicatorDetailsStore);

  readonly selectedRealization = signal<Realization | null>(null);

  constructor() {
    // set initial selectedRealizationId to the first realization id
    effect(() => {
      const initialRealization = this.state.realizations()?.[0];
      if (!initialRealization) return;
      this.selectedRealization.set(initialRealization);
    });

    // load realization data when selectedRealizationId changes
    effect(() => {
      if (!this.selectedRealization()) return;
      this.state.loadRealizationData({
        searchCriteria: {
          ...DefaultSearchCriteria,
          sort: 'date-desc',
          pageSize: 10,
        },
        id: this.selectedRealization()?.id || 0,
      });
    });
  }

  loadRealizationData(searchCriteria: SearchCriteria) {
    this.state.loadRealizationData({
      searchCriteria,
      id: this.selectedRealization()?.id || 0,
    });
  }
}
