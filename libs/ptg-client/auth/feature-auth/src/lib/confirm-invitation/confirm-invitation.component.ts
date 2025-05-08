import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Button } from 'primeng/button';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@ptg/auth-data-access-auth';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { mustBeSame, checkPassword } from '../validators';

@Component({
  selector: 'ptg-confirm-invitation',
  imports: [Button, FormsModule, RouterLink, PasswordFormComponent],
  template: `
    <p class="text-center header-style-18">Aktywacja konta</p>

    <ptg-password-form [form]="form" />

    <p-button
      class="block my-4"
      label="Potwierdź"
      severity="secondary"
      [disabled]="form.invalid"
      (click)="confirmAccount()"
    />

    <p-button
      label="Powrót do logowania"
      variant="text"
      routerLink="/auth/login"
    />
  `,
  styles: `
    ptg-confirm-invitation {
      .p-button {
        width: 100% !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmInvitationComponent {
  readonly token = input<string>();
  readonly state = inject(AuthStore);

  readonly form = inject(FormBuilder).group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        mustBeSame('password', 'confirmPassword'),
        checkPassword('confirmPassword'),
      ],
    },
  );

  confirmAccount(): void {
    if (this.form.invalid) return;

    this.state.confirmInvitation({
      password: this.form.controls['password'].value || '',
      token: this.token() || '',
    });
  }
}
