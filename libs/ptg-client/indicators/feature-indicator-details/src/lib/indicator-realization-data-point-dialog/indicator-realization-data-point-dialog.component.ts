import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import dayjs from 'dayjs';

@Component({
  selector: 'ptg-indicator-realization-data-point-dialog',
  templateUrl: './indicator-realization-data-point-dialog.component.html',
  styleUrl: './indicator-realization-data-point-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputText, DatePicker, Button],
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorRealizationDataPointDialogComponent {
  readonly form = inject(UntypedFormBuilder).group({
    id: 0,
    value: [null, Validators.required],
    date: [null, Validators.required],
  });

  private readonly _dialog = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _state = inject(IndicatorDetailsStore);

  get mode(): 'create' | 'edit' {
    return this._dynamicDialogConfig.data.mode;
  }

  constructor() {
    if (this.mode === 'edit') {
      this.form.patchValue({
        ...this._dynamicDialogConfig.data.dataPoint,
        date: new Date(this._dynamicDialogConfig.data.dataPoint.date),
      });
    }
  }

  addValue(): void {
    this._state.addRealizationDataPoint({
      data: {
        ...this.form.value,
        date: dayjs(this.form.value.date).format(),
      },
      id: this._dynamicDialogConfig.data.id,
    });
    this._dialog.close();
  }

  editValue(): void {
    this._state.editRealizationDataPoint({
      ...this.form.value,
      date: dayjs(this.form.value.date).format(),
    });
    this._dialog.close();
  }
}
