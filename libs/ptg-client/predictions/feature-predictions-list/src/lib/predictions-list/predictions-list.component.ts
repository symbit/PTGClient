import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';
import { PredictionsListStore } from '@ptg/predictions-data-access-predictions';
import { DefaultSearchCriteria, Sort } from '@ptg/shared-types';
import { PredictionPeriodPipe } from '@ptg/predictions-utils';
import { MenuItem } from 'primeng/api';
import { PredictionStatusPillComponent } from '@ptg/predictions-ui-prediction-status-pill';
import { PredictionsListLoadingComponent } from './predictions-list-loading.component';
import { EmptyStateComponent } from '@ptg/shared-ui-empty-state';
import { Prediction } from '@ptg/predictions-types';
import { Menu } from 'primeng/menu';
import { firstValueFrom } from 'rxjs';
import { ConfirmDeleteDialogComponent } from '@ptg/shared-ui-confirm-delete-dialog';
import { DialogService } from 'primeng/dynamicdialog';

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
    PredictionPeriodPipe,
    PredictionStatusPillComponent,
    PredictionsListLoadingComponent,
    EmptyStateComponent,
    Menu,
  ],
  providers: [DialogService],
})
export class PredictionsListComponent {
  readonly state = inject(PredictionsListStore);
  readonly ROWS_PER_PAGE = ROWS_PER_PAGE;
  readonly menuSelectedItem = signal<Prediction | null>(null);
  readonly items = computed<MenuItem[]>(() => [
    {
      label: 'Szczegóły prognozy',
      icon: 'pi pi-eye',
      routerLink: [this.menuSelectedItem()?.id],
    },
    {
      label: 'Wygeneruj ponownie',
      icon: 'pi pi-reply',
      visible: this.menuSelectedItem()?.status === 'failure',
      command: () => this.retryPrediction(this.menuSelectedItem()?.id || 0),
    },
    {
      label: 'Usuń prognozę',
      icon: 'pi pi-trash',
      command: () => this.onDelete(this.menuSelectedItem()?.id || 0),
      iconClass: '!text-secondary-100',
    },
  ]);

  private readonly _dialogService = inject(DialogService);

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

  retryPrediction(id: number): void {
    this.state.retryPrediction(id);
  }

  async onDelete(id: number): Promise<void> {
    const dialog = await firstValueFrom(
      this._dialogService.open(ConfirmDeleteDialogComponent, {
        header: 'Jesteś pewny, że chcesz usunąć wybraną prognozę?',
        modal: true,
        closable: false,
        width: '500px',
        data: {
          confirmLabel: 'Usuń',
          cancelLabel: 'Anuluj',
        },
      }).onClose,
    );

    if (dialog) {
      this.state.deletePrediction(id);
    }
  }
}
