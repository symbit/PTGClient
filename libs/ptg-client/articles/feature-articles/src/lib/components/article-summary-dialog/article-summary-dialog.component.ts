import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'ptg-article-summary-dialog',
  template: `<p>{{ data.summary }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSummaryDialogComponent {
  readonly dynamicDialogConfig = inject(DynamicDialogConfig);

  get data() {
    return this.dynamicDialogConfig.data;
  }
}
