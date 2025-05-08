import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@ptg/auth-data-access-auth';

@Component({
  selector: 'ptg-request-reset-password',
  template: `
    <p class="text-center header-style-18">Przypomnienie hasła</p>
    <p class="text-center my-4">
      W porządku! To zdarza się nawet najlepszym. Podaj swój adres e-mail,
      abyśmy mogli wysłać link do zmiany adresu.
    </p>

    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <input pInputText id="email" placeholder="Email" [formControl]="email" />
    </div>

    <p-button
      class="block my-4"
      label="Wyślij link resetujący"
      severity="secondary"
      [disabled]="email.invalid"
      (click)="state.requestPasswordReset(email.value || '')"
    />

    <p-button
      label="Powrót do logowania"
      variant="text"
      routerLink="/auth/login"
    />
  `,
  styles: `
    ptg-request-reset-password {
      .p-button {
        width: 100% !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, InputText, Button, RouterLink, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class RequestResetPasswordComponent {
  readonly state = inject(AuthStore);
  readonly email = inject(FormBuilder).control('', [
    Validators.email,
    Validators.required,
  ]);
}
