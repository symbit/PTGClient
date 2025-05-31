import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { DashboardStore } from '@ptg/dashboard-data-access-dashboard';
import { ArticleItemComponent } from './article-item.component';

@Component({
  selector: 'ptg-dashboard-articles',
  template: `
    <p-card header="Najnowsze artykuły">
      <div class="flex flex-col gap-2">
        @for (article of state.articles(); track article) {
          <ptg-article-item [article]="article" />
        }
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, ArticleItemComponent],
})
export class DashboardArticlesComponent {
  readonly state = inject(DashboardStore);
}
