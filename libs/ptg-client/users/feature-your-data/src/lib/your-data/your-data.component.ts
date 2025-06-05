import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { UserStore } from '@ptg/users-data-access-users';
import { Tag } from 'primeng/tag';
import { UserStatusPipe } from '@ptg/users-utils';
import { AuthStore } from '@ptg/auth-data-access-auth';
import { RouterLink } from '@angular/router';
import {
  checkPassword,
  mustBeSame,
  PasswordFormComponent,
} from '@ptg/auth-feature-auth';
import { YourDataLoadingComponent } from './your-data-loading.component';

@Component({
  selector: 'ptg-your-data',
  templateUrl: './your-data.component.html',
  styleUrl: './your-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    DropdownModule,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Tag,
    UserStatusPipe,
    RouterLink,
    PasswordFormComponent,
    YourDataLoadingComponent,
  ],
})
export class YourDataComponent {
  readonly state = inject(UserStore);
  readonly authState = inject(AuthStore);

  readonly form = inject(UntypedFormBuilder).group({
    id: '',
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: '',
    role: ['', Validators.required],
  });
  readonly passwordForm = inject(UntypedFormBuilder).group(
    {
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        mustBeSame('password', 'confirmPassword'),
        checkPassword('confirmPassword'),
      ],
    },
  );

  constructor() {
    this.state.loadUser(this.authState.user()?.id || 0);

    effect(() => {
      const user = this.state.user();
      if (!user) return;
      this.form.patchValue(user);
      this.form.controls['email'].disable();
    });
  }

  onSave(): void {
    if (this.form.invalid) return;

    if (this.form.dirty) {
      this.state.editUser(this.form.getRawValue());
    }

    if (this.passwordForm.dirty) {
      this.state.updatePassword({
        email: this.form.getRawValue().email,
        newPassword: this.passwordForm.value.password,
      });
    }
  }
}
