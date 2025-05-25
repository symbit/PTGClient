import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Step,
  StepList,
  StepPanel,
  StepPanels,
  Stepper,
} from 'primeng/stepper';
import { AnalysisCreatorScheduleComponent } from '../analysis-creator-schedule/analysis-creator-schedule.component';
import { AnalysisCreatorIndicatorsComponent } from '../analysis-creator-indicators/analysis-creator-indicators.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalysisStore } from '@ptg/analysis-data-access-analysis';
import { analysisConfig } from '@ptg/analysis-utils';
import { Realization } from '@ptg/indicators-types';
import dayjs from 'dayjs';

@Component({
  selector: 'ptg-analysis-creator-wrapper',
  templateUrl: './analysis-creator-wrapper.component.html',
  styleUrl: './analysis-creator-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    AnalysisCreatorScheduleComponent,
    AnalysisCreatorIndicatorsComponent,
  ],
})
export class AnalysisCreatorWrapperComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _analysisStore = inject(AnalysisStore);
  readonly form = this._fb.group({
    schedule: this._fb.group({
      startDate: [null, Validators.required],
      endDate: [dayjs().format(), Validators.required],
    }),
    realizations: this._fb.array([this._fb.control(null, Validators.required)]),
  });

  get realizations() {
    return this.form.get('realizations') as FormArray;
  }

  get schedule() {
    return this.form.get('schedule') as FormGroup;
  }

  generate(): void {
    this._analysisStore.createAnalysis({
      ...this.schedule.value,
      ...analysisConfig,
      realizationIds: this.realizations.value.map((r: Realization) => r.id),
    });
  }
}
