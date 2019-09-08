import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from '@angular/forms';

@Injectable()
export class DrawingSizeValidatorService {

  constructor() { }

  formValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      const width = control.get('width');
      const height = control.get('height');
      if ((width ? width : 0) < 0 || (height ? height : 0) < 0) {
        errors.sizeBellowZero = {
          message: 'You must input a positive value for the size',
        };
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  validateSize(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
