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
        (changeSelectedRealization)="selectedRealizationId.set($event)"
      />
    </p-card>

    <ptg-indicator-realization-data
      [data]="state.entities()"
      [total]="state.total()"
      [realizationId]="selectedRealizationId()"
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

  readonly selectedRealizationId = signal<number>(0);

  constructor() {
    // set initial selectedRealizationId to the first realization id
    effect(() => {
      const initialRealizationId = this.state.realizations()?.[0]?.id;
      if (!initialRealizationId) return;
      this.selectedRealizationId.set(initialRealizationId);
    });

    // load realization data when selectedRealizationId changes
    effect(() => {
      if (!this.selectedRealizationId()) return;
      this.state.loadRealizationData({
        searchCriteria: {
          ...DefaultSearchCriteria,
          pageSize: 10,
        },
        id: this.selectedRealizationId(),
      });
    });
  }

  loadRealizationData(searchCriteria: SearchCriteria) {
    this.state.loadRealizationData({
      searchCriteria,
      id: this.selectedRealizationId(),
    });
  }
}
