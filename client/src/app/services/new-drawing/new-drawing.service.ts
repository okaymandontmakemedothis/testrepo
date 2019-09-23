import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DrawingSizeValidatorService } from '../drawing-size-validator/drawing-size-validator.service';

@Injectable()
export class NewDrawingService {

  form: FormGroup;
  private isSizeModified = false;

  constructor(private drawingSizeValidatorService: DrawingSizeValidatorService, private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      size: this.formBuilder.group({
        width: window.innerWidth,
        height: window.innerHeight,
      }, {
        validator: this.drawingSizeValidatorService.formValidator(),
      }),
      rgb: this.formBuilder.group({
        r: 255,
        g: 255,
        b: 255,
      }),
      a: this.formBuilder.control(1),
    });

    this.sizeGroup.valueChanges.subscribe((size) => {
      this.isSizeModified = !(size.width === window.innerWidth && size.height === window.innerHeight);
      this.form.updateValueAndValidity();
    });
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.drawingSizeValidatorService.validateSize(this.form);
      return false;
    }
    return true;
  }

  get sizeGroup(): FormGroup {
    return this.form.get('size') as FormGroup;
  }

  onResize() {
    if (!this.isSizeModified) {
      this.sizeGroup.setValue({ width: window.innerWidth, height: window.innerHeight });
    }
  }
}
