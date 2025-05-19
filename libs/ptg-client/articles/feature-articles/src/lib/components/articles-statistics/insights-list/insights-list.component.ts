import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { InsightComponent } from './insight.component';
import { ArticleInsights } from '@ptg/articles-types';

@Component({
  selector: 'ptg-insights-list',
  template: `
    <p-card>
      <ng-template #title>
        <h2 class="header-style-18">Insighty</h2>
      </ng-template>

      <ng-template #subtitle>
        <p>
          Przeanalizowano
          {{ articleInsights()?.numberOfArticlesAnalyzed }} artykułów
        </p>
      </ng-template>

      <div class="flex flex-col gap-4">
        @for (insight of articleInsights()?.insights || []; track insight) {
          <ptg-insight [insight]="insight" />
        }
      </div>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, InsightComponent],
})
export class InsightsListComponent {
  readonly articleInsights = input.required<ArticleInsights | null>();
}
