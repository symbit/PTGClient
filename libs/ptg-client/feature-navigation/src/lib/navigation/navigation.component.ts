import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { NavigationItemComponent } from './navigation-item.component';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthStore } from '@ptg/auth-data-access-auth';
import { NotificationsService } from '@ptg/notifications-data-access-notifications';
import { Ripple } from 'primeng/ripple';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'ptg-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavigationItemComponent,
    Button,
    Menu,
    Ripple,
    RouterLink,
    OverlayBadgeModule,
    Tooltip,
  ],
})
export class NavigationComponent {
  readonly authState = inject(AuthStore);
  readonly notificationsService = inject(NotificationsService);
  readonly items = [
    {
      link: '/dashboard',
      label: 'Dashboard',
    },
    {
      link: '/indicators',
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

  readonly notifications = signal<MenuItem[]>([]);
  readonly unreadNotifications = signal(0);

  private readonly _notification = toSignal(
    this.notificationsService.getMessages(),
  );

  constructor() {
    effect(() => {
      const notification = this._notification();
      if (!notification) return;

      untracked(() => {
        this.notifications.set([
          ...this.notifications(),
          {
            data: notification,
          },
        ]);
        this.unreadNotifications.set(this.unreadNotifications() + 1);
      });
    });
  }
}
