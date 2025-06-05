import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { ArticlesStore } from '@ptg/articles-data-access-articles';
import { SentimentStatisticsComponent } from './sentiment-statistics/sentiment-statistics.component';
import { SourceStatisticsComponent } from './source-statistics/source-statistics.component';
import { InsightsListComponent } from './insights-list/insights-list.component';
import { ArticlesStatisticsLoadingComponent } from './articles-statistics-loading.component';

@Component({
  selector: 'ptg-articles-statistics',
  templateUrl: './articles-statistics.component.html',
  styleUrl: './articles-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GeneralStatisticsComponent,
    SentimentStatisticsComponent,
    SourceStatisticsComponent,
    InsightsListComponent,
    ArticlesStatisticsLoadingComponent,
  ],
  providers: [ArticlesStore],
})
export class ArticlesStatisticsComponent implements OnInit {
  readonly state = inject(ArticlesStore);

  ngOnInit(): void {
    this.state.loadNewsDashboard();
  }
}
