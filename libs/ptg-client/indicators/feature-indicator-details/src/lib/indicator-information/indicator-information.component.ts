import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import { DataBoxComponent } from '@ptg/shared-ui-data-box';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { IndicatorEditDialogComponent } from '../indicator-edit-dialog/indicator-edit-dialog.component';
import { IndicatorSourceMapper } from '@ptg/shared-utils';

@Component({
  selector: 'ptg-indicator-information',
  imports: [Card, Button, DataBoxComponent, IndicatorSourceMapper, DatePipe],
  templateUrl: './indicator-information.component.html',
  styleUrl: './indicator-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class IndicatorInformationComponent {
  readonly state = inject(IndicatorDetailsStore);

  private readonly _dialogService = inject(DialogService);

  edit(): void {
    this._dialogService.open(IndicatorEditDialogComponent, {
      header: 'Edytuj wskaźnik',
      modal: true,
      closable: true,
      width: '1000px',
    });
  }
}
