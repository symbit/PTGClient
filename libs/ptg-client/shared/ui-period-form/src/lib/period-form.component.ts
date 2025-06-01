import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import dayjs from 'dayjs';

export interface PeriodOption {
  label: string;
  value: () => string;
}

const DEFAULT_OPTIONS = [
  {
    label: 'Ostatni rok',
    value: () => dayjs().subtract(1, 'year').format(),
  },
  {
    label: 'Ostatnie 3 lata',
    value: () => dayjs().subtract(3, 'year').format(),
  },
  {
    label: 'Ostatnie 5 lat',
    value: () => dayjs().subtract(5, 'year').format(),
  },
  {
    label: 'Własny',
    value: () => 'custom',
  },
];

@Component({
  selector: 'ptg-period-form',
  template: `
    <div class="flex gap-2">
      <div class="flex flex-col gap-2 w-full">
        <label for="frequency">{{ label() }}</label>
        <p-select
          id="frequency"
          [options]="options()"
          [placeholder]="label()"
          class="w-full"
          [(ngModel)]="selectedPeriod"
        />
      </div>

      @if (isCustomPeriod()) {
        <div class="flex flex-col gap-2 w-full">
          <label for="from">Data od</label>
          <p-datepicker
            [formControl]="startDateControl()"
            id="from"
            placeholder="Data od"
            dateFormat="dd.mm.yy"
            styleClass="w-full"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
          ></p-datepicker>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label for="to">Data do</label>
          <p-datepicker
            [formControl]="endDateControl()"
            id="to"
            placeholder="Data do"
            dateFormat="dd.mm.yy"
            styleClass="w-full"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
          ></p-datepicker>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePicker, FormsModule, Select, ReactiveFormsModule],
})
export class PeriodFormComponent {
  readonly startDateControl = input.required<FormControl>();
  readonly endDateControl = input.required<FormControl>();

  readonly options = input<PeriodOption[]>(DEFAULT_OPTIONS);
  readonly label = input<string>();
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(new Date());

  readonly selectedPeriod = signal<(() => string) | null>(null);

  readonly isCustomPeriod = computed(() => {
    const value = this.selectedPeriod();

    return value && value() === 'custom';
  });

  constructor() {
    effect(() => {
      const value = this.selectedPeriod();

      if (!value) return;

      if (value() !== 'custom') {
        this.endDateControl().setValue(dayjs().format());
      }

      // component supports periods in the past and in the future, we define that base on the selected value
      if (dayjs(value()).isBefore(dayjs())) {
        this.startDateControl().setValue(value());
      } else {
        this.endDateControl().setValue(value());
      }
    });
  }
}
