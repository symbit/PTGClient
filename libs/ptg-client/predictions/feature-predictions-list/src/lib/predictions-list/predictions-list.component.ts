import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { PredictionsListStore } from '@ptg/predictions-data-access-predictions';
import { DefaultSearchCriteria, Sort } from '@ptg/shared-types';
import { PredictionPeriodPipe } from '@ptg/predictions-utils';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PredictionStatusPillComponent } from '@ptg/predictions-ui-prediction-status-pill';

const ROWS_PER_PAGE = 10;

@Component({
  selector: 'ptg-predictions-list',
  templateUrl: './predictions-list.component.html',
  styleUrl: './predictions-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    Button,
    RouterLink,
    DatePipe,
    TableModule,
    Tooltip,
    ConfirmDialog,
    PredictionPeriodPipe,
    PredictionStatusPillComponent,
  ],
  providers: [ConfirmationService],
})
export class PredictionsListComponent {
  readonly state = inject(PredictionsListStore);
  readonly ROWS_PER_PAGE = ROWS_PER_PAGE;

  private readonly _confirmationService = inject(ConfirmationService);

  constructor() {
    this.state.loadPredictions({
      ...DefaultSearchCriteria,
      sort: 'generationDate',
      page: 1,
      pageSize: ROWS_PER_PAGE,
    });
  }

  onSort(sort: Sort): void {
    this.state.loadPredictions({
      ...this.state.criteria(),
      page: 1,
      pageSize: ROWS_PER_PAGE,
      sort: sort.order === 1 ? `${sort.field}-asc` : `${sort.field}-desc`,
    });
  }

  onPageChange(page: TablePageEvent): void {
    this.state.loadPredictions({
      ...this.state.criteria(),
      page: page.first / ROWS_PER_PAGE + 1,
      pageSize: ROWS_PER_PAGE,
    });
  }

  onDelete(event: Event, id: number): void {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Uwaga!',
      message: 'Jesteś pewny, że chcesz usunąć wybraną prognozę?',
      rejectLabel: 'Anuluj',
      rejectButtonProps: {
        label: 'Anuluj',
        severity: 'contrast',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Usuń',
        severity: 'secondary',
      },

      accept: () => {
        this.state.deletePrediction(id);
      },
    });
  }
}
