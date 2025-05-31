import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Card } from 'primeng/card';
import { PredictionCreatorLocalState } from './prediction-creator.local-state';
import { Select } from 'primeng/select';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { CreatePrediction, PredictionDefinition } from '@ptg/predictions-types';
import { toSignal } from '@angular/core/rxjs-interop';
import { PredictionPeriods } from '@ptg/predictions-utils';

@Component({
  selector: 'ptg-prediction-creator',
  templateUrl: './prediction-creator.component.html',
  styleUrl: './prediction-creator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Select, ReactiveFormsModule, Button],
  providers: [PredictionCreatorLocalState],
})
export class PredictionCreatorComponent {
  private readonly _fb = inject(UntypedFormBuilder);

  readonly state = inject(PredictionCreatorLocalState);
  readonly form = this._fb.group({
    predictionDefinition: [null, Validators.required],
    nForecast: [null, Validators.required],
    forceNewPrediction: false,
  });
  private readonly _selectedDefinition = toSignal(
    this.form.controls['predictionDefinition'].valueChanges,
  );

  readonly periodOptions = computed(() => {
    const definition =
      this._selectedDefinition() as unknown as PredictionDefinition;

    if (!definition) return [];

    return PredictionPeriods[
      definition.frequency as keyof typeof PredictionPeriods
    ];
  });

  generatePrediction() {
    if (this.form.invalid) return;

    this.state.generatePrediction({
      predictionDefinitionId: this.form.value.predictionDefinition?.id || 0,
      nForecast: this.form.value.nForecast,
      forceNewPrediction: false,
    } as unknown as CreatePrediction);
  }
}
