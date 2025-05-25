import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { PredictionCreatorLocalState } from './prediction-creator.local-state';
import { Select } from 'primeng/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { PeriodFormComponent } from '@ptg/shared-ui-period-form';
import { Button } from 'primeng/button';
import { CreatePrediction } from '@ptg/predictions-types';

@Component({
  selector: 'ptg-prediction-creator',
  templateUrl: './prediction-creator.component.html',
  styleUrl: './prediction-creator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Select, ReactiveFormsModule, PeriodFormComponent, Button],
  providers: [PredictionCreatorLocalState],
})
export class PredictionCreatorComponent {
  private readonly _fb = inject(FormBuilder);

  readonly state = inject(PredictionCreatorLocalState);
  readonly form = this._fb.group({
    predictionDefinitionId: ['', Validators.required],
    forceNewPrediction: false,
    startDateTime: [null, Validators.required],
    endDateTime: [dayjs().format(), Validators.required],
  });

  generatePrediction() {
    if (this.form.invalid) return;

    this.state.generatePrediction(
      this.form.value as unknown as CreatePrediction,
    );
  }
}
