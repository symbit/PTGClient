import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  output,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { IndicatorSourceMapper } from '@ptg/shared-utils';
import { InputText } from 'primeng/inputtext';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { IndicatorsService } from '@ptg/indicators-data-access-indicators';
import { Indicator } from '@ptg/indicators-types';

@Component({
  selector: 'ptg-indicator-search',
  imports: [
    FormsModule,
    IndicatorSourceMapper,
    InputText,
    RadioButton,
    ReactiveFormsModule,
    Select,
  ],
  templateUrl: './indicator-search.component.html',
  styleUrl: './indicator-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorSearchComponent {
  private readonly _fb = inject(UntypedFormBuilder);
  readonly constantsStore = inject(ConstantsStore);
  readonly selectedIndicatorChanged = output<Indicator>();

  readonly indicators = rxResource({
    request: () => this._formChanged(),
    loader: () => {
      return this._indicatorsService
        .getIndicators({
          page: 0,
          pageSize: 0,
          term: this.searchForm.get('term')?.value,
          filters: [
            {
              name: 'source',
              value: this.searchForm.get('source')?.value,
              behaviour: 'AND',
              operator: '==',
            },
          ],
        })
        .pipe(map((response) => response.results));
    },
  });

  readonly searchForm = this._fb.group({
    source: '',
    term: '',
  });
  readonly selectedIndicator = model<Indicator | null>(null);

  private readonly _formChanged = toSignal(this.searchForm.valueChanges);
  private readonly _indicatorsService = inject(IndicatorsService);

  constructor() {
    effect(() => {
      const selectedIndicator = this.selectedIndicator();
      if (!selectedIndicator) return;

      this.selectedIndicatorChanged.emit(selectedIndicator);
    });
  }
}
