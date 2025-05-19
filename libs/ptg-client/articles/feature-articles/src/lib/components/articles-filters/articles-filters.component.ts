import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  model,
  OnInit,
  output,
} from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { ConstantsStore } from '@ptg/shared-data-access-constants';
import { PrimeTemplate } from 'primeng/api';
import { SectorPipe } from '@ptg/shared-utils';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { Filters } from '@ptg/shared-types';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ptg-articles-filters',
  templateUrl: './articles-filters.component.html',
  styleUrl: './articles-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputText,
    Card,
    Select,
    PrimeTemplate,
    SectorPipe,
    ReactiveFormsModule,
    DatePicker,
    FormsModule,
  ],
})
export class ArticlesFiltersComponent implements OnInit {
  readonly constantsStore = inject(ConstantsStore);

  readonly filtersChanged = output<void>();
  readonly selectedPublicationDate = model(null);
  readonly publicationDateOptions = [
    {
      label: 'Ostatni tydzień',
      value: 'week',
    },
    {
      label: 'Ostatni miesiąc',
      value: 'month',
    },
    {
      label: 'Ostatni kwartał',
      value: 'quarter',
    },
    {
      label: 'Ostatni rok',
      value: 'year',
    },
    {
      label: 'Własny',
      value: 'custom',
    },
  ];

  readonly form = inject(FormBuilder).group({
    term: '',
    sector: null,
    publicationDate: [],
  });

  private readonly _articlesStore = inject(ArticlesStore);
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const publicationDate = this.selectedPublicationDate();
      if (!publicationDate) return;

      let startDate = '';
      switch (publicationDate) {
        case 'week':
          startDate = dayjs().subtract(7, 'day').format();
          break;
        case 'month':
          startDate = dayjs().subtract(1, 'month').format();
          break;
        case 'quarter':
          startDate = dayjs().subtract(3, 'month').format();
          break;
        case 'year':
          startDate = dayjs().subtract(1, 'year').format();
          break;
        default:
          startDate = '';
      }

      if (publicationDate !== 'custom')
        this.form.patchValue({
          publicationDate: [startDate, dayjs().format()] as any,
        });
    });
  }

  ngOnInit(): void {
    this._onFiltersChanged();
  }

  onClearPublicationDate(): void {
    this.form.patchValue({
      publicationDate: [] as any,
    });
  }

  private _onFiltersChanged(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        this.filtersChanged.emit();

        this._articlesStore.loadArticles({
          ...this._articlesStore.criteria(),
          page: 1,
          term: value.term || '',
          filters: this._getFilters(),
        });
      });
  }

  private _getFilters(): Filters {
    const isRelevant = this._articlesStore
      .criteria()
      .filters?.find((f) => f.name === 'isRelevant')?.value as boolean;
    const filters: Filters = [
      {
        name: 'isRelevant',
        value: isRelevant,
        behaviour: 'AND',
      },
    ];

    if (this.form.value.sector) {
      filters.push({
        name: 'sectors',
        value: this.form.value.sector,
        behaviour: 'AND',
        operator: 'any',
      });
    }

    if (this.form.value.publicationDate?.[0]) {
      filters.push({
        name: 'publicationDate',
        value: this.form.value.publicationDate[0],
        behaviour: 'AND',
        operator: '>=',
      });
    }

    if (this.form.value.publicationDate?.[1]) {
      filters.push({
        name: 'publicationDate',
        value: this.form.value.publicationDate[1],
        behaviour: 'AND',
        operator: '<=',
      });
    }
    return filters;
  }
}
