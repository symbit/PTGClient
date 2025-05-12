import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { injectDestroyRef } from '@ptg/shared-utils';
import { DatePicker } from 'primeng/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import dayjs from 'dayjs';

@Component({
  selector: 'ptg-analysis-creator-schedule',
  templateUrl: './analysis-creator-schedule.component.html',
  styleUrl: './analysis-creator-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Card, Select, DatePicker, FormsModule, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AnalysisCreatorScheduleComponent implements OnInit {
  readonly form = input.required<FormGroup>();

  readonly next = output<void>();

  readonly period = inject(FormBuilder).control('');
  readonly frequancies = [
    {
      label: 'Ostatni rok',
      value: 'last-year',
    },
    {
      label: 'Ostatnie 3 lata',
      value: 'last-3-years',
    },
    {
      label: 'Ostatnie 5 lat',
      value: 'last-5-years',
    },
    {
      label: 'Własny',
      value: 'custom',
    },
  ];
  readonly MAX_DATE = new Date();

  private readonly _destroyRef = injectDestroyRef();

  ngOnInit(): void {
    this.period.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        if (value === 'na') {
          this.form().get('startDate')?.reset();
        } else {
          this._subtractStartDate();
        }
      });
  }

  private _subtractStartDate(): void {
    if (this.period.value === 'last-year') {
      this.form()
        .get('startDate')
        ?.setValue(dayjs().subtract(1, 'year').format());
    }

    if (this.period.value === 'last-3-years') {
      this.form()
        .get('startDate')
        ?.setValue(dayjs().subtract(3, 'year').format());
    }
    if (this.period.value === 'last-5-years') {
      this.form()
        .get('startDate')
        ?.setValue(dayjs().subtract(5, 'year').format());
    }
  }
}
