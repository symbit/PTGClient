import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { PredictionDetailsStore } from '@ptg/predictions-data-access-predictions';
import { Card } from 'primeng/card';
import { BackButtonComponent } from '@ptg/shared-ui-back-button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PredictionPeriodPipe } from '@ptg/predictions-utils';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { PredictionChartComponent } from '../prediction-information/prediction-chart.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PredictionForecastDataTableComponent } from '../prediction-forecast-data-table/prediction-forecast-data-table.component';
import { PredictionStatusPillComponent } from '@ptg/predictions-ui-prediction-status-pill';
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
}
