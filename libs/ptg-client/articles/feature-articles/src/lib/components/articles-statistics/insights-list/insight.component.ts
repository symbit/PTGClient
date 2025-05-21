import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Insight } from '@ptg/articles-types';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'ptg-insight',
  template: `
    <p>{{ insight().insightText }}</p>

    <p-carousel
      [value]="insight().sources"
      [numVisible]="3"
      [numScroll]="3"
      [circular]="false"
    >
      <ng-template let-source #item>
        <a
          class="block border rounded-md border-neutral-300 m-2 p-4 bg-neutral-400 max-w-1/3"
          [href]="source.url"
          target="_blank"
        >
          <p>{{ source.title }}</p>
        </a>
      </ng-template>
    </p-carousel>
  `,
  styles: `
    ptg-insight {
      border: 1px solid var(--neutral-light-300);
      border-radius: 8px;
      padding: 16px;

      .p-carousel-item {
        flex: 0 0 33.3333% !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Carousel],
  encapsulation: ViewEncapsulation.None,
})
export class InsightComponent {
  readonly insight = input.required<Insight>();
}
