import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { IndicatorsStore } from '@ptg/indicators-data-access-indicators';
import { IndicatorCardComponent } from '../indicator-card/indicator-card.component';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { injectDestroyRef } from '@ptg/shared-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter } from 'rxjs';
import { linkedQueryParam } from 'ngxtension/linked-query-param';
import { DefaultSearchCriteria } from '@ptg/shared-types';

const ROWS_PER_PAGE = 20;

@Component({
  selector: 'ptg-indicators-list',
  templateUrl: './indicators-list.component.html',
  styleUrl: './indicators-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconField,
    InputIcon,
    InputText,
    IndicatorCardComponent,
    Paginator,
    ReactiveFormsModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorsListComponent {
  readonly currentPage = linkedQueryParam('page', {
    parse: (value) => parseInt(value ?? '1', 10),
  });

  readonly term = linkedQueryParam('term');

  readonly paginator = viewChild<Paginator>('paginator');
  readonly state = inject(IndicatorsStore);
  readonly ROWS_PER_PAGE = ROWS_PER_PAGE;
  readonly search = inject(FormBuilder).control(this.term() || '');

  private readonly _destroyRef = injectDestroyRef();

  constructor() {
    this.state.loadIndicators({
      ...DefaultSearchCriteria,
      page: this.currentPage(),
      term: this.term() || '',
    });

    this.search.valueChanges
      .pipe(
        filter((value) => value !== null),
        debounceTime(500),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((term) => {
        this.term.set(term);
        this.state.loadIndicators({
          ...this.state.criteria(),
          page: 1,
          term,
        });
        this.paginator()!.first = 0;
      });
  }

  onPageChange(event: PaginatorState): void {
    this.currentPage.set((event.page || 0) + 1);
    this.state.loadIndicators({
      ...this.state.criteria(),
      page: (event.page || 0) + 1,
    });
  }
}
