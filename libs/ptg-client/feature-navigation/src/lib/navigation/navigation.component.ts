import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationItemComponent } from './navigation-item.component';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthStore } from '@ptg/auth-data-access-auth';

@Component({
  selector: 'ptg-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationItemComponent, Button, Menu],
})
export class NavigationComponent {
  readonly authState = inject(AuthStore);
  readonly items = [
    {
      link: '/dashboard',
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

  readonly userOptions: MenuItem[] = [
    {
      label: 'Twoje dane',
      icon: 'pi pi-user-edit',
      routerLink: '/users/your-data',
    },
    {
      label: 'Wyloguj się',
      icon: 'pi pi-sign-out',
      command: () => this.authState.logout(),
    },
  ];
}
