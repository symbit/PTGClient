import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '@ptg/articles-types';
import { SectorPipe } from '@ptg/shared-utils';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'ptg-article-item',
  template: ` <div
    class="rounded-md border border-neutral-300 p-2 flex justify-between items-center "
  >
    <div class="flex items-center gap-4">
      <p>{{ article().provider }}</p>
      <p>{{ article().title }}</p>
    </div>
    <div class="ml-4 flex flex-wrap gap-2">
      @for (sector of article().sectors; track sector) {
        <p-tag severity="secondary" [value]="sector | sector" />
      }
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectorPipe, Tag],
})
export class ArticleItemComponent {
  readonly article = input.required<Article>();
}
