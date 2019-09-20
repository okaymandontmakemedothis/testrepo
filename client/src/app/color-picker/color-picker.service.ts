import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable(
  { providedIn: 'root' },
)
export class ColorPickerService {

  colorForm: FormGroup;
  private formBuilder: FormBuilder;
  rgbString: string;

  constructor() {
    this.formBuilder = new FormBuilder();
    this.colorForm = this.formBuilder.group({
      hsl: this.formBuilder.group({
        h: 180,
        s: 1,
        l: 1,
      }),
      rgb: this.formBuilder.group({
        r: 255,
        g: 255,
        b: 255,
      }),
      a: 1,
    });
    this.rgbString = this.getRGBString();
    this.rgb.valueChanges.subscribe((value) => {
      this.rgbString = this.getRGBString();
    });
  }

  get hsl(): FormGroup {
    return this.colorForm.get('hsl') as FormGroup;
  }

  get rgb(): FormGroup {
    return this.colorForm.get('rgb') as FormGroup;
  }

  get a(): FormControl {
    return this.colorForm.get('a') as FormControl;
  }

  getRGBString(): string {
    const r = this.rgb.get('r') as FormControl;
    const g = this.rgb.get('g') as FormControl;
    const b = this.rgb.get('b') as FormControl;
    return 'rgb(' + r.value + ',' + g.value + ',' + b.value + ')';
  }

}
