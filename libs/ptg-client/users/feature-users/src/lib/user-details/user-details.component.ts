import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { BackButtonComponent } from '@ptg/shared-ui-back-button';
import { UserStore } from '@ptg/users-data-access-users';
import { RouterLink } from '@angular/router';
import { Tag } from 'primeng/tag';
import { InputText } from 'primeng/inputtext';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { isSuperadmin } from '@ptg/auth-data-access-auth';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { UserRolePipe, UserStatusPipe } from '@ptg/users-utils';

@Component({
  selector: 'ptg-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    Tag,
    InputText,
    ConfirmDialog,
    DropdownModule,
    BackButtonComponent,
    RouterLink,
    UserStatusPipe,
    ReactiveFormsModule,
    UserRolePipe,
  ],
  providers: [ConfirmationService],
})
export class UserDetailsComponent {
  readonly state = inject(UserStore);

  readonly userId = input<number>();
  readonly isSuperadmin = isSuperadmin();
  readonly roles = ['super_admin', 'admin', 'user'];

  readonly form = inject(UntypedFormBuilder).group({
    id: '',
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
  });

  private readonly _confirmationService = inject(ConfirmationService);

  constructor() {
    effect(() => {
      const user = this.state.user();
      if (!user) return;
      this.form.patchValue(user);
      this.form.controls['email'].disable();
    });
  }

  onDelete(event: Event): void {
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
        this.state.deleteUser(this.state.user()?.id || 0);
      },
    });
  }

  onSave(): void {
    if (this.form.invalid) return;

    if (this.userId()) {
      this.state.editUser(this.form.getRawValue());
    } else {
      this.state.createUser(this.form.getRawValue());
    }
  }
}
