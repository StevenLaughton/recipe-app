import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export function IngredientsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = control.value
      .split('..')
      .map((ing: string) => ing.trim())
      .every((ing: string) => !isNaN(+ing.split(' ')[0]));
    const ret = valid
      ? null
      : { error: 'Ingredients do not match the pattern' };
    return ret;
  };
}
