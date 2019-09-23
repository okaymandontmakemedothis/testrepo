import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RGB } from 'src/app/model/rgb.model';

@Injectable(
  { providedIn: 'root' },
)
export class ColorPickerService {

  colorForm: FormGroup;
  private formBuilder: FormBuilder;
  rgbString: string;
  rgb: FormGroup;
  hsl: FormGroup;
  a: FormControl;

  constructor() {
    this.formBuilder = new FormBuilder();
    this.rgb = this.formBuilder.group({
      r: 255,
      g: 255,
      b: 255,
    });
    this.hsl = this.formBuilder.group({
      h: 180,
      s: 1,
      l: 1,
    });
    this.a = this.formBuilder.control(1);
    this.colorForm = this.formBuilder.group({
      hsl: this.hsl,
      rgb: this.rgb,
      a: this.a,
    });
    this.setRGBString();
    this.rgb.valueChanges.subscribe((value) => {
      this.setRGBString();
    });
  }

  get hex(): string {
    const rgb: RGB = {
      r: (this.rgb.get('r') as FormControl).value,
      g: (this.rgb.get('g') as FormControl).value,
      b: (this.rgb.get('b') as FormControl).value,
    };
    let r: string; let g: string; let b: string;
    if (rgb.r < 16) {
      r = '0' + rgb.r.toString(16);
    } else {
      r = rgb.r.toString(16);
    }
    if (rgb.g < 16) {
      g = '0' + rgb.g.toString(16);
    } else {
      g = rgb.g.toString(16);
    }
    if (rgb.b < 16) {
      b = '0' + rgb.b.toString(16);
    } else {
      b = rgb.b.toString(16);
    }
    return '#' + r + g + b;
  }

  private setRGBString(): void {
    const r = this.rgb.get('r') as FormControl;
    const g = this.rgb.get('g') as FormControl;
    const b = this.rgb.get('b') as FormControl;
    this.rgbString = 'rgb(' + r.value + ',' + g.value + ',' + b.value + ')';
  }

}
