import { FormGroup } from '@angular/forms';

export function checkPassword(confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const capitalLetter = new RegExp('[A-Z]');
    const letter = new RegExp('[a-z]');
    const number = new RegExp('[0-9]');
    const specialCharacter = new RegExp("[$&+,:;=?@#|'<>.^*()%!-]");
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!capitalLetter.test(confirmPasswordControl.value)) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        notContainCapitalLetter: true,
      });
    }

    if (!number.test(confirmPasswordControl.value)) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        notContainNumber: true,
      });
    }

    if (!specialCharacter.test(confirmPasswordControl.value)) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        notContainSpecialCharacter: true,
      });
    }

    if (!letter.test(confirmPasswordControl.value)) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        notContainLetter: true,
      });
    }

    if (!(confirmPasswordControl.value.length >= 6)) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        notContainMinLength: true,
      });
    }
  };
}
