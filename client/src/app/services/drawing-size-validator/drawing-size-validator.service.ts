import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class DrawingSizeValidatorService {

  formValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      const width = control.get('width');
      const height = control.get('height');
      if ((width ? width : 1) < 1 || (height ? height : 1) < 1) {
        errors.sizeBellowZero = {
          message: 'You must input a positive value above 0 for the size',
        };
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  validateSize(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
