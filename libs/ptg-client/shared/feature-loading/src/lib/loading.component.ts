import { Component, inject } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';
import { LoadingService } from './loading.service';

@Component({
  selector: 'ptg-loading',
  template: `
    @if (loadingService.isLoading()) {
      <p-progressbar mode="indeterminate" [style]="{ height: '3px' }" />
    }
  `,
  imports: [ProgressBar],
})
export class LoadingComponent {
  readonly loadingService = inject(LoadingService);
}
