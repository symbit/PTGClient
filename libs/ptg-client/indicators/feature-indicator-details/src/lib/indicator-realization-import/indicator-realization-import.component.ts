import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { IndicatorDetailsStore } from '@ptg/indicators-data-access-indicators';
import { FileUpload } from 'primeng/fileupload';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ptg-indicator-realization-import',
  template: `
    <p-fileupload
      mode="advanced"
      chooseLabel="Wybierz plik"
      chooseIcon="pi pi-upload"
      accept="text/csv"
      showUploadButton="false"
      showCancelButton="false"
      [chooseButtonProps]="{
        severity: 'contrast',
        outlined: true,
        size: 'small',
      }"
      (onSelect)="file.set($event.files[0])"
      (onRemove)="file.set(null)"
    >
      <ng-template #empty>
        <div>Przeciągnij i upuść pliki tutaj, aby je przesłać.</div>
      </ng-template>
    </p-fileupload>

    <div class="flex justify-start mt-2">
      <p-button
        label="Importuj"
        severity="secondary"
        [disabled]="!file()"
        (click)="import()"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FileUpload, Button],
})
export class IndicatorRealizationImportComponent {
  readonly file = signal<File | null>(null);

  private readonly _dialog = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _state = inject(IndicatorDetailsStore);

  import(): void {
    if (!this.file()) return;
    this._state.importDataPoints({
      file: this.file()!,
      id: this._dynamicDialogConfig.data.id,
    });
    this._dialog.close();
  }
}
