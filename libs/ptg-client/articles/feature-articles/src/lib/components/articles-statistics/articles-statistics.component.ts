import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ptg-articles-statistics',
  templateUrl: './articles-statistics.component.html',
  styleUrl: './articles-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesStatisticsComponent {}
