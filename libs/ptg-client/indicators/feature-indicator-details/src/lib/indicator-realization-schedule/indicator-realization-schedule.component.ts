import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { Card } from 'primeng/card';
import { FrequencyPipe, RegionPipe, SectorPipe } from '@ptg/shared-utils';
import { PrimeTemplate } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import { uniqBy } from 'lodash-es';

@Component({
  selector: 'ptg-indicator-realization-schedule',
  templateUrl: './indicator-realization-schedule.component.html',
  styleUrl: './indicator-realization-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    DropdownModule,
    PrimeTemplate,
    Select,
    FrequencyPipe,
    RegionPipe,
    SectorPipe,
  ],
})
export class IndicatorRealizationScheduleComponent {
  readonly state = inject(IndicatorDetailsStore);
  readonly changeSelectedRealization = output<number>();

  readonly region = signal<string | null>(null);
  readonly sector = signal<string | null>(null);
  readonly frequency = signal<string | null>(null);

  readonly frequenciesOptions = computed(() => {
    const realizations = this.state
      .realizations()
      .filter((r) => (this.region() ? r.region === this.region() : true))
      .filter((r) => (this.sector() ? r.sector === this.sector() : true));

    return uniqBy(realizations, 'frequency').map((r) => r.frequency);
  });

  readonly sectorsOptions = computed(() => {
    const realizations = this.state
      .realizations()
      .filter((r) => (this.region() ? r.region === this.region() : true))
      .filter((r) =>
        this.frequency() ? r.frequency === this.frequency() : true,
      );

    return uniqBy(realizations, 'sector').map((r) => r.sector);
  });

  readonly regionsOptions = computed(() => {
    const realizations = this.state
      .realizations()
      .filter((r) => (this.sector() ? r.sector === this.sector() : true))
      .filter((r) =>
        this.frequency() ? r.frequency === this.frequency() : true,
      );

    return uniqBy(realizations, 'region').map((r) => r.region);
  });

  constructor() {
    effect(() => {
      const realizationId = this.state
        .realizations()
        .find(
          (r) =>
            r.region === this.region() &&
            r.sector === this.sector() &&
            r.frequency === this.frequency(),
        )?.id;

      if (!realizationId) return;

      this.changeSelectedRealization.emit(realizationId);
    });
  }
}
