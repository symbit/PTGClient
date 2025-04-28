import { FormGroup } from '@angular/forms';

export function mustBeSame(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        mustBeSame: true,
      });
    }
  };
}
