import { Injectable } from '@angular/core';
import { DrawingSizeValidatorService } from '../drawing-size-validator/drawing-size-validator.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class NewDrawingService {

  form: FormGroup;

  constructor(private drawingSizeValidatorService: DrawingSizeValidatorService, private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      size: this.formBuilder.group({
        width: window.innerWidth,
        height: window.innerHeight,
      }, {
        validator: this.drawingSizeValidatorService.formValidator(),
      }),
      color: null,
    });
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.drawingSizeValidatorService.validateSize(this.form);
      return false;
    }
    return true;
  }
}
