import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { ExplanatoryRealization } from '@ptg/predictions-types';
import { Article } from '@ptg/articles-types';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'ptg-prediction-used-data',
  templateUrl: './prediction-used-data.component.html',
  styleUrl: './prediction-used-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Carousel],
})
export class PredictionUsedDataComponent {
  readonly explanatoryRealizations = input.required<ExplanatoryRealization[]>();
  readonly usedNewsArticles = input.required<Article[]>();
}
