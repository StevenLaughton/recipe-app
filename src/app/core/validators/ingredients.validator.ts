import { AbstractControl, ValidatorFn } from '@angular/forms';

export namespace CustomValidators {
  export function IngredientsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control.value
        .split('..')
        .map((ing: string) => ing.trim())
        .every((ing: string) => typeof ing.split(' ').shift() === 'number');
      return valid ? { ingredients: { value: control.value } } : null;
    };
  }
}
