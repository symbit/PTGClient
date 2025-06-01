import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { AnalysisConfig } from '@ptg/analysis-types';
import { analysisConfig } from '@ptg/analysis-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ptg-analysis-chart-config',
  templateUrl: './analysis-chart-config.component.html',
  styleUrl: './analysis-chart-config.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, InputText, ReactiveFormsModule],
})
export class AnalysisChartConfigComponent {
  readonly n = input<number>(0);
  readonly configChanged = output<AnalysisConfig>();

  readonly form = inject(UntypedFormBuilder).group({
    emaHalflife: [null, Validators.min(1)],
    ar: [null, [Validators.min(0), this.arValidator()]],
    i: [null, Validators.min(0)],
    ma: [null, [Validators.min(0), this.maValidator()]],
    nForecasts: [1, Validators.min(1)],
  });

  constructor() {
    this.form.patchValue(analysisConfig);

    this.form.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe(() => {
        if (this.form.valid) this.configChanged.emit(this.form.value);
      });
  }

  arValidator(): ValidatorFn {
    const n = this.n();

    if (!n) return () => null;

    return (control: AbstractControl): { [key: string]: any } | null => {
      const max = n - control.parent?.value.i;
      if (control.value != null && control.value > max) {
        return { max: { requiredMax: max, actual: control.value } };
      }
      return null;
    };
  }

  maValidator(): ValidatorFn {
    const n = this.n();

    if (!n) return () => null;

    return (control: AbstractControl): { [key: string]: any } | null => {
      const max = n - control.parent?.value.i - 1;
      if (control.value != null && control.value > max) {
        return { max: { requiredMax: max, actual: control.value } };
      }
      return null;
    };
  }
}
