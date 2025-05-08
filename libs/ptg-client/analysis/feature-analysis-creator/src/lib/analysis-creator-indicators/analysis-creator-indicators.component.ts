import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Button } from 'primeng/button';
import { AnalysisCreatorIndicatorRealizationComponent } from '../analysis-creator-indicator-realization/analysis-creator-indicator-realization.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ptg-analysis-creator-indicators',
  templateUrl: './analysis-creator-indicators.component.html',
  styleUrl: './analysis-creator-indicators.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, AnalysisCreatorIndicatorRealizationComponent],
  encapsulation: ViewEncapsulation.None,
})
export class AnalysisCreatorIndicatorsComponent {
  readonly realizations = input.required<FormArray>();

  readonly next = output<void>();
  readonly previous = output<void>();

  readonly MAX_INDICATORS = 2;

  private readonly _fb = inject(FormBuilder);

  addIndicator(): void {
    this.realizations().push(this._fb.control(null, Validators.required));
  }

  remove(index: number): void {
    this.realizations().removeAt(index);
  }
}
