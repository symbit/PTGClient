import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@ptg/auth-data-access-auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ptg-login',
  template: `
    <form [formGroup]="form" (ngSubmit)="login()">
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input
          pInputText
          id="email"
          placeholder="Email"
          formControlName="email"
        />
      </div>

      <div class="flex flex-col gap-2 mt-4">
        <label for="password">Hasło</label>
        <input
          pInputText
          id="password"
          type="password"
          placeholder="Hasło"
          formControlName="password"
        />
      </div>

      <div class="flex justify-end my-3">
        <p-button
          label="Zapomniałeś hasła?"
          variant="text"
          routerLink="/auth/request-password-reset"
        />
      </div>

      <p-button
        type="submit"
        label="Zaloguj się"
        severity="secondary"
        [disabled]="form.invalid || !form.dirty"
      />
    </form>
  `,
  styles: `
    ptg-login {
      .p-button {
        width: 100% !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, Button, ReactiveFormsModule, RouterLink],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  readonly form = inject(FormBuilder).group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  readonly state = inject(AuthStore);

  login(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.state.login({ email: email || '', password: password || '' });
  }
}
