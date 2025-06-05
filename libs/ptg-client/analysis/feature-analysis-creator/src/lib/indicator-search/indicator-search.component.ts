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
import { toSignal } from '@angular/core/rxjs-interop';
import { Indicator } from '@ptg/indicators-types';
import { IndicatorSearchLocalState } from './indicator-search.local-state';
import { IndicatorSearchLoadingComponent } from './indicator-search-loading.component';
import { EmptyStateComponent } from '@ptg/shared-ui-empty-state';

@Component({
  selector: 'ptg-indicator-search',
  imports: [
    FormsModule,
    IndicatorSourceMapper,
    InputText,
    RadioButton,
    ReactiveFormsModule,
    Select,
    IndicatorSearchLoadingComponent,
    EmptyStateComponent,
  ],
  templateUrl: './indicator-search.component.html',
  styleUrl: './indicator-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IndicatorSearchLocalState],
})
export class IndicatorSearchComponent {
  private readonly _fb = inject(UntypedFormBuilder);
  readonly selectedIndicatorChanged = output<Indicator>();
  readonly state = inject(IndicatorSearchLocalState);

  readonly searchForm = this._fb.group({
    source: '',
    term: '',
  });
  readonly selectedIndicator = model<Indicator | null>(null);

  private readonly _formChanged = toSignal(this.searchForm.valueChanges);

  constructor() {
    effect(() => {
      const formValue = this._formChanged();
      if (!formValue) return;

      this.state.form.set({
        source: formValue.source,
        term: formValue.term,
      });
    });

    effect(() => {
      const selectedIndicator = this.selectedIndicator();
      if (!selectedIndicator) return;

      this.selectedIndicatorChanged.emit(selectedIndicator);
    });
  }
}
