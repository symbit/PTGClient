import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ptg-close-page-confirmation-dialog',
  template: `
    <div class="flex justify-start gap-2">
      <p-button
        type="button"
        label="Opuść"
        severity="secondary"
        (click)="dialogRef.close(true)"
      />
      <p-button
        type="button"
        label="Anuluj"
        severity="contrast"
        [outlined]="true"
        (click)="dialogRef.close(false)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class ClosePageConfirmationDialogComponent {
  readonly dialogRef = inject(DynamicDialogRef);
}
