import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { RealizationData } from '@ptg/indicators-types';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { DefaultSearchCriteria, SearchCriteria, Sort } from '@ptg/shared-types';
import { DialogService } from 'primeng/dynamicdialog';
import { IndicatorRealizationDataPointDialogComponent } from '../indicator-realization-data-point-dialog/indicator-realization-data-point-dialog.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import { IndicatorRealizationImportComponent } from '../indicator-realization-import/indicator-realization-import.component';
import { Tooltip } from 'primeng/tooltip';

const ROWS_PER_PAGE = 10;

@Component({
  selector: 'ptg-indicator-realization-data',
  templateUrl: './indicator-realization-data.component.html',
  styleUrl: './indicator-realization-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Button, TableModule, DatePipe, ConfirmDialog, Tooltip],
  providers: [DialogService, ConfirmationService],
})
export class IndicatorRealizationDataComponent {
  readonly table = viewChild<Table>('table');

  readonly data = input.required<RealizationData[]>();
  readonly total = input.required<number>();
  readonly realizationId = input.required<number>();

  readonly loadRealizationData = output<SearchCriteria>();
  readonly ROWS_PER_PAGE = ROWS_PER_PAGE;

  private readonly _state = inject(IndicatorDetailsStore);
  private readonly _dialogService = inject(DialogService);
  private readonly _confirmationService = inject(ConfirmationService);

  onSort(sort: Sort): void {
    this.loadRealizationData.emit({
      ...DefaultSearchCriteria,
      page: 1,
      pageSize: ROWS_PER_PAGE,
      sort: sort.order === 1 ? `${sort.field}-asc` : `${sort.field}-desc`,
    });
  }

  onPageChange(page: TablePageEvent): void {
    const { sortOrder, sortField } = this.table()!.createLazyLoadMetadata();

    this.loadRealizationData.emit({
      ...DefaultSearchCriteria,
      page: page.first / ROWS_PER_PAGE + 1,
      pageSize: ROWS_PER_PAGE,
      sort: sortField
        ? sortOrder === 1
          ? `${sortField}-asc`
          : `${sortField}-desc`
        : '',
    });
  }

  import(): void {
    this._dialogService.open(IndicatorRealizationImportComponent, {
      header: 'Importuj wartości wskaźnika',
      modal: true,
      closable: true,
      width: '500px',
      data: {
        id: this.realizationId(),
      },
    });
  }

  addDataPoint(): void {
    this._dialogService.open(IndicatorRealizationDataPointDialogComponent, {
      header: 'Dodaj wartość wskaźnika',
      modal: true,
      closable: true,
      width: '500px',
      data: {
        mode: 'create',
        id: this.realizationId(),
      },
    });
  }

  editDataPoint(dataPoint: RealizationData): void {
    this._dialogService.open(IndicatorRealizationDataPointDialogComponent, {
      header: 'Edytuj wartość wskaźnika',
      modal: true,
      closable: true,
      width: '500px',
      data: {
        mode: 'edit',
        id: this.realizationId(),
        dataPoint,
      },
    });
  }

  deleteDataPoint(event: Event, data: RealizationData): void {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Uwaga!',
      message: 'Jesteś pewny, że chcesz usunąć wybraną wartość wskaźnika?',
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
        this._state.removeRealizationDataPoint(data.id);
      },
    });
  }
}
