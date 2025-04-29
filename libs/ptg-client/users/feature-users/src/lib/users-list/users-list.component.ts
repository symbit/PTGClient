import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserStore } from '@ptg/users-data-access-users';
import { DefaultSearchCriteria, User } from '@ptg/shared-types';
import { Avatar } from 'primeng/avatar';
import { Tag } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { UserRolePipe, UserStatusPipe } from '@ptg/users-utils';

@Component({
  selector: 'ptg-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    Button,
    TableModule,
    Avatar,
    Tag,
    ConfirmDialog,
    UserRolePipe,
    UserStatusPipe,
    RouterLink,
  ],
  providers: [ConfirmationService],
})
export class UsersListComponent {
  readonly state = inject(UserStore);

  private readonly _confirmationService = inject(ConfirmationService);

  constructor() {
    this.state.loadUsers(DefaultSearchCriteria);
  }

  onDelete(event: Event, user: User): void {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Uwaga!',
      message: 'Jesteś pewny, że chcesz usunąć wybranego użytkownika?',
      rejectLabel: 'Anuluj',
      rejectButtonProps: {
        label: 'Anuluj',
        severity: 'contrast',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Usuń',
        severity: 'secondary',
      },

      accept: () => {
        this.state.deleteUser(user.id);
      },
    });
  }

  onInvite(event: Event, user: User): void {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Czy na pewno chcesz zaprosić użytkownika do systemu?',
      header: 'Uwaga!',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Anuluj',
        severity: 'contrast',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Zaproś',
      },
      accept: () => {
        this.state.inviteUser(user.id);
      },
    });
  }
}
