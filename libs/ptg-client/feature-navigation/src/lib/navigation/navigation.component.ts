import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NavigationItemComponent } from './navigation-item.component';

@Component({
  selector: 'ptg-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatIconButton, MatIconButton, NavigationItemComponent],
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
