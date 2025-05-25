import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ptg-force-new-prediction',
  template: `
    <div class="flex justify-start gap-2">
      <p-button
        type="button"
        severity="secondary"
        label="Stwórz prognozę"
        (click)="dialogRef.close(true)"
      />
      <p-button
        type="button"
        label="Przejdź do istniejącej prognozy"
        severity="contrast"
        [outlined]="true"
        (click)="dialogRef.close(false)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class ForceNewPredictionComponent {
  readonly dialogRef = inject(DynamicDialogRef);
}
