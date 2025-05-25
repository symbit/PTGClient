import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

import { PeriodFormComponent } from '@ptg/shared-ui-period-form';

@Component({
  selector: 'ptg-analysis-creator-schedule',
  templateUrl: './analysis-creator-schedule.component.html',
  styleUrl: './analysis-creator-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    FormsModule,
    ReactiveFormsModule,
    PeriodFormComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AnalysisCreatorScheduleComponent {
  readonly form = input.required<FormGroup>();

  readonly next = output<void>();
}
