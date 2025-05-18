import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ptg-confirm-delete-dialog',
  template: `
    <div class="flex justify-start gap-2">
      <p-button
        type="button"
        [severity]="data?.secondary || 'secondary'"
        [label]="data?.confirmLabel || 'Usuń'"
        (click)="dialogRef.close(true)"
      />
      <p-button
        type="button"
        [label]="data?.cancelLabel || 'Anuluj'"
        severity="contrast"
        [outlined]="true"
        (click)="dialogRef.close(false)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class ConfirmDeleteDialogComponent {
  readonly dialogRef = inject(DynamicDialogRef);
  readonly dynamicDialogConfig = inject(DynamicDialogConfig);

  get data() {
    return this.dynamicDialogConfig.data;
  }
}
