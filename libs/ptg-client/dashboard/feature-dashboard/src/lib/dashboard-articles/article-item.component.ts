import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from '@ptg/articles-types';
import { Button } from 'primeng/button';

@Component({
  selector: 'ptg-article-item',
  template: ` <div
    class="rounded-md border border-neutral-300 p-2 flex justify-between items-center "
  >
    <div class="flex items-center gap-4">
      <p>{{ article().provider }}</p>
      <p>{{ article().title }}</p>
    </div>

    <a [href]="article().url" target="_blank">
      <p-button icon="pi pi-arrow-right" [rounded]="true" [text]="true" />
    </a>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class ArticleItemComponent {
  readonly article = input.required<Article>();
}
