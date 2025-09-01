import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

import { PredictionDetailsStore } from '@ptg/predictions-data-access-predictions';
import { BackButtonComponent } from '@ptg/shared-ui-back-button';
import { PredictionPeriodPipe } from '@ptg/predictions-utils';
import { PredictionStatusPillComponent } from '@ptg/predictions-ui-prediction-status-pill';

import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

import { PredictionChartComponent } from '../prediction-chart/prediction-chart.component';
import { PredictionForecastDataTableComponent } from '../prediction-forecast-data-table/prediction-forecast-data-table.component';
import { PredictionUsedDataComponent } from '../prediction-used-data/prediction-used-data.component';

@Component({
  selector: 'ptg-prediction-details',
  templateUrl: './prediction-details.component.html',
  styleUrl: './prediction-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    BackButtonComponent,
    RouterLink,
    DatePipe,
    Button,
    Tooltip,
    PredictionChartComponent,
    ConfirmDialog,
    PredictionPeriodPipe,
    PredictionForecastDataTableComponent,
    PredictionStatusPillComponent,
    PredictionUsedDataComponent,
  ],
  providers: [PredictionDetailsStore, ConfirmationService],
})
export class PredictionDetailsComponent implements AfterViewInit {
  readonly id = input<number>();
  readonly state = inject(PredictionDetailsStore);

  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _clipboard = inject(Clipboard);

  ngAfterViewInit(): void {
    this.state.loadPrediction(this.id() || 0);
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

  copyPredictionComment(): void {
    const comment = document.createElement('div');
    comment.innerHTML = this.state.prediction()?.generatedComment || '';
    this._clipboard.copy(comment?.textContent || '');
  }

  exportPdf(): void {
    const id = this.id();
    if (!id) return;

    this.state.generatePdf(id);
  }

  exportExcel(): void {
    const id = this.id();
    if (!id) return;

    this.state.generateExcel(id);
  }
}
