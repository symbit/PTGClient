import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Password } from 'primeng/password';

@Component({
  selector: 'ptg-password-form',
  template: `
    <form [formGroup]="form()">
      <div class="flex flex-col gap-2">
        <label for="password">Hasło</label>

        <p-password
          placeholder="Hasło"
          inputId="password"
          formControlName="password"
          promptLabel="Wpisz hasło"
          weakLabel="Hasło słabe"
          mediumLabel="Hasło normalne"
          strongLabel="Hasło żlożone"
        />
      </div>

      <div class="flex flex-col gap-2 mt-4">
        <label for="confirmPassword">Powtórz hasło</label>

        <p-password
          placeholder="Powtórz hasło"
          formControlName="confirmPassword"
          inputId="confirmPassword"
        />
      </div>
    </form>
  `,
  styles: `
    ptg-password-form {
      .p-password,
      .p-password-input {
        width: 100% !important;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Password, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class PasswordFormComponent {
  readonly form = input.required<FormGroup>();
}
