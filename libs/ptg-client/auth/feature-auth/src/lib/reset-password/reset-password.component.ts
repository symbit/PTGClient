import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Button } from 'primeng/button';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { mustBeSame } from '../validators/must-be-same.validator';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { checkPassword } from '../validators/password.validator';
import { AuthStore } from '@ptg/auth-data-access-auth';

@Component({
  selector: 'ptg-reset-password',
  template: ` <p class="text-center header-style-18">Reset hasła</p>

    <ptg-password-form [form]="form" />

    <p-button
      class="block my-4"
      label="Resetuj hasło"
      severity="secondary"
      [disabled]="form.invalid"
      (click)="onResetPassword()"
    />

    <p-button
      label="Powrót do logowania"
      variant="text"
      routerLink="/auth/login"
    />`,
  styles: `
    ptg-reset-password {
      .p-button {
        width: 100% !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, FormsModule, RouterLink, PasswordFormComponent],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent {
  readonly state = inject(AuthStore);
  readonly activatedRoute = inject(ActivatedRoute);
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

  onResetPassword(): void {
    if (this.form.invalid) return;

    this.state.resetPassword({
      password: this.form.get('password')?.value,
      token: this.activatedRoute.snapshot.paramMap.get('token') || '',
    });
  }
}
