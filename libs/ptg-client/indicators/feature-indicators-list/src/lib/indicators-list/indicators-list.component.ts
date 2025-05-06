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
  readonly paginator = viewChild<Paginator>('paginator');
  readonly state = inject(IndicatorsStore);
  readonly ROWS_PER_PAGE = ROWS_PER_PAGE;
  readonly search = inject(FormBuilder).control('');

  private readonly _destroyRef = injectDestroyRef();

  constructor() {
    this.search.valueChanges
      .pipe(
        filter((value) => value !== null),
        debounceTime(500),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((term) => {
        this.state.loadIndicators({
          ...this.state.criteria(),
          page: 1,
          term,
        });
        this.paginator()?.changePage(0);
      });
  }

  onPageChange(event: PaginatorState): void {
    this.state.loadIndicators({
      ...this.state.criteria(),
      page: (event.page || 0) + 1,
    });
  }
}
