import { inject, Injectable, signal } from '@angular/core';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { IndicatorsService } from '@ptg/indicators-data-access-indicators';

@Injectable()
export class IndicatorSearchLocalState {
  readonly form = signal({
    source: '',
    term: '',
  });

  readonly constantsStore = inject(ConstantsStore);
  readonly indicators = rxResource({
    request: () => this.form(),
    loader: () => {
      if (!this.form().source && !this.form().term) return of([]); // Return empty array if no filters are applied

      return this._indicatorsService
        .getIndicators({
          page: 0,
          pageSize: 0,
          term: this.form().term,
          filters: this.form().source
            ? [
                {
                  name: 'source',
                  value: this.form().source,
                  behaviour: 'AND',
                  operator: '==',
                },
              ]
            : [],
        })
        .pipe(map((response) => response.results));
    },
  });

  private readonly _indicatorsService = inject(IndicatorsService);
}
