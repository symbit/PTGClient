import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticlesFiltersComponent } from '../components/articles-filters/articles-filters.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Tab, TabList, Tabs } from 'primeng/tabs';

@Component({
  selector: 'ptg-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArticlesFiltersComponent,
    RouterOutlet,
    RouterLink,
    Tabs,
    TabList,
    Tab,
  ],
})
export class ArticlesComponent {
  readonly tabs = [
    {
      route: '/articles',
      label: 'Statystyki',
      routerLinkActiveOptions: { exact: true },
    },
    {
      route: '/articles/accepted',
      label: 'Zaakceptowane',
      routerLinkActiveOptions: { exact: true },
    },
    {
      route: '/articles/rejected',
      label: 'Odrzucone',
      routerLinkActiveOptions: { exact: true },
    },
  ];
}
