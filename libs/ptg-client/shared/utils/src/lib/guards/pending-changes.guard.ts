import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ClosePageConfirmationDialogComponent } from '@ptg/shared-ui-close-page-confirmation-dialog';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export function pendingChangesGuard(
  component: ComponentCanDeactivate,
): boolean | Observable<boolean> {
  const dialogService = inject(DialogService);

  return component.canDeactivate()
    ? true
    : dialogService.open(ClosePageConfirmationDialogComponent, {
        header: 'Czy na pewno chcesz opuścić stronę?',
        modal: true,
        closable: false,
        width: '500px',
      }).onClose;
}
