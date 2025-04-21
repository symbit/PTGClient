import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationItemComponent } from './navigation-item.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'ptg-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationItemComponent, Button],
})
export class NavigationComponent {
  readonly items = [
    {
      link: '',
      label: 'Dashboard',
    },
    {
      link: '/rates',
      label: 'Wskaźniki',
    },
    {
      link: '/analysis',
      label: 'Analizy',
    },
    {
      link: '/articles',
      label: 'Artykuły',
    },
    {
      link: '/predictions',
      label: 'Prognozy',
    },
    {
      link: '/users',
      label: 'Użytkownicy',
    },
  ];
}
