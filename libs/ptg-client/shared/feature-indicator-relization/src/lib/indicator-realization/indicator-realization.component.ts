import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FrequencyPipe, RegionPipe, SectorPipe } from '@ptg/shared-utils';
import { PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import { uniqBy } from 'lodash-es';
import { Realization } from '@ptg/indicators-types';

@Component({
  selector: 'ptg-indicator-realization',
  templateUrl: './indicator-realization.component.html',
  styleUrl: './indicator-realization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PrimeTemplate, Select, FrequencyPipe, RegionPipe, SectorPipe],
})
export class IndicatorRealizationComponent {
  readonly realizations = input.required<Realization[]>();
  readonly changeSelectedRealization = output<number>();

  readonly region = signal<string | null>(null);
  readonly sector = signal<string | null>(null);
  readonly frequency = signal<string | null>(null);

  readonly frequenciesOptions = computed(() => {
    const realizations = this.realizations()
      .filter((r) => (this.region() ? r.region === this.region() : true))
      .filter((r) => (this.sector() ? r.sector === this.sector() : true));

    return uniqBy(realizations, 'frequency').map((r) => r.frequency);
  });

  readonly sectorsOptions = computed(() => {
    const realizations = this.realizations()
      .filter((r) => (this.region() ? r.region === this.region() : true))
      .filter((r) =>
        this.frequency() ? r.frequency === this.frequency() : true,
      );

    return uniqBy(realizations, 'sector').map((r) => r.sector);
  });

  readonly regionsOptions = computed(() => {
    const realizations = this.realizations()
      .filter((r) => (this.sector() ? r.sector === this.sector() : true))
      .filter((r) =>
        this.frequency() ? r.frequency === this.frequency() : true,
      );

    return uniqBy(realizations, 'region').map((r) => r.region);
  });

  constructor() {
    effect(() => {
      const realizationId = this.realizations().find(
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
