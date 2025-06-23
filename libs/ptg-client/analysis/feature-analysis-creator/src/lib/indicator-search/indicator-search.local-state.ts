import { inject, Injectable, signal } from '@angular/core';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { IndicatorsService } from '@ptg/indicators-data-access-indicators';
import { Filters } from '@ptg/shared-types';

@Injectable()
export class IndicatorSearchLocalState {
  readonly form = signal({
    group: '',
    source: '',
    term: '',
  });

  readonly constantsStore = inject(ConstantsStore);
  readonly indicators = rxResource({
    request: () => this.form(),
    loader: () => {
      if (!Object.values(this.form()).some((value) => value)) return of([]); // Return empty array if no filters are applied

      return this._indicatorsService
        .getIndicators({
          page: 0,
          pageSize: 0,
          term: this.form().term,
          filters: this.getFilters(),
        })
        .pipe(map((response) => response.results));
    },
  });

  private readonly _indicatorsService = inject(IndicatorsService);

  private getFilters(): Filters {
    const filters: Filters = [];

    if (this.form().source) {
      filters.push({
        name: 'source',
        value: this.form().source,
        behaviour: 'AND',
        operator: '==',
      });
    }
    if (this.form().group) {
      filters.push({
        name: 'group',
        value: this.form().group,
        behaviour: 'AND',
        operator: '==',
      });
    }

    return filters;
  }
}
