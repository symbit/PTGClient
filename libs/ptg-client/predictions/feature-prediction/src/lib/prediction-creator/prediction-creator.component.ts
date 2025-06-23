import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
import { indicatorGroups } from '@ptg/indicators-types';

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
    group: null,
    predictionDefinition: [null, Validators.required],
    nForecast: [null, Validators.required],
    forceNewPrediction: false,
  });
  private readonly _selectedDefinition = toSignal(
    this.form.controls['predictionDefinition'].valueChanges,
  );
  private readonly _groupChanged = toSignal(
    this.form.controls['group'].valueChanges,
  );

  readonly periodOptions = computed(() => {
    const definition =
      this._selectedDefinition() as unknown as PredictionDefinition;

    if (!definition) return [];

    return PredictionPeriods[
      definition.frequency as keyof typeof PredictionPeriods
    ];
  });

  readonly predictionDefinitions = computed(() => {
    if (this.state.group()) {
      return this.state.predictionsDefinitionsByGroup.value() || [];
    } else {
      return this.state.predictionsDefinitions.value() || [];
    }
  });

  constructor() {
    effect(() => {
      this.state.group.set(this._groupChanged());

      if (!this._groupChanged()) this.state.predictionsDefinitions.reload();
    });
  }

  generatePrediction() {
    if (this.form.invalid) return;

    this.state.generatePrediction({
      predictionDefinitionId: this.form.value.predictionDefinition?.id || 0,
      nForecast: this.form.value.nForecast,
      forceNewPrediction: false,
    } as unknown as CreatePrediction);
  }

  protected readonly indicatorGroups = indicatorGroups;
}
