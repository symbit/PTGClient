import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import {
  FrequencyPipe,
  IndicatorSourceMapper,
  RegionPipe,
  SectorPipe,
} from '@ptg/shared-utils';
import { Chip } from 'primeng/chip';
import { uniqBy } from 'lodash-es';
import dayjs from 'dayjs';

@Component({
  selector: 'ptg-indicator-edit-dialog',
  templateUrl: './indicator-edit-dialog.component.html',
  styleUrl: './indicator-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Textarea,
    Button,
    DatePicker,
    Chip,
    FrequencyPipe,
    SectorPipe,
    RegionPipe,
    IndicatorSourceMapper,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorEditDialogComponent {
  readonly state = inject(IndicatorDetailsStore);
  readonly form = inject(UntypedFormBuilder).group({
    id: 0,
    symbol: '',
    name: '',
    description: '',
    nextExecutionDate: '',
    source: '',
    isAutomaticallyDownloaded: '',
    downloadScheduleInterval: '',
  });

  readonly frequencies = computed(() => {
    return uniqBy(this.state.realizations(), 'frequency').map(
      (r) => r.frequency,
    );
  });

  readonly sectors = computed(() => {
    return uniqBy(this.state.realizations(), 'sector').map((r) => r.sector);
  });

  readonly regions = computed(() => {
    return uniqBy(this.state.realizations(), 'region').map((r) => r.region);
  });

  private readonly _dialog = inject(DynamicDialogRef);

  constructor() {
    const indicator = this.state.indicator();
    if (indicator) {
      this.form.patchValue({
        ...indicator,
        nextExecutionDate: new Date(indicator.nextExecutionDate),
      });

      this.form.get('symbol')?.disable();
      this.form.get('nextExecutionDate')?.disable();
    }
  }

  save(): void {
    if (this.form.invalid) return;
    this.state.editIndicator({
      ...this.form.getRawValue(),
      nextExecutionDate: dayjs(
        this.form.getRawValue().nextExecutionDate,
      ).format(),
    });
    this._dialog.close();
  }
}
