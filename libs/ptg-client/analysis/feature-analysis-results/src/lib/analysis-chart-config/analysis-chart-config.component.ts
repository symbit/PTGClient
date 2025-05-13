import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
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
  readonly configChanged = output<AnalysisConfig>();

  readonly form = inject(UntypedFormBuilder).group({
    emaHalflife: [null, Validators.min(1)],
    ar: [null, Validators.min(1)],
    i: [null, Validators.min(1)],
    ma: [null, Validators.min(1)],
    nForecasts: [1, Validators.min(1)],
  });

  constructor() {
    this.form.patchValue(analysisConfig);

    this.form.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe(() => this.configChanged.emit(this.form.value));
  }
}
