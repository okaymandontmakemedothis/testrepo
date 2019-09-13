import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorTransformer } from 'src/app/color-transformer';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  colorForm: FormGroup;

  ngOnInit(): void {
    this.colorForm = new FormGroup({
      hsl: new FormGroup({
        h: new FormControl(180),
        s: new FormControl(1),
        l: new FormControl(1),
      }),
      rgb: new FormGroup({
        r: new FormControl(255),
        g: new FormControl(255),
        b: new FormControl(255),
      }),
      a: new FormControl(1),
    });
  }

  get hsl(): FormGroup {
    return this.colorForm.get('hsl') as FormGroup;
  }

  get rgb(): FormGroup {
    return this.colorForm.get('rgb') as FormGroup;
  }

  updateRGB(value: any) {
    const rgb = ColorTransformer.hsl2rgb({ h: value.h, s: value.s, l: value.l });
    const r = this.rgb.get('r') as FormControl;
    r.setValue(rgb.r);
    const g = this.rgb.get('g') as FormControl;
    g.setValue(rgb.g);
    const b = this.rgb.get('b') as FormControl;
    b.setValue(rgb.b);
  }

  updateHSL(value: any) {
    const hsl = ColorTransformer.rgb2hsl({ r: value.r, g: value.g, b: value.b });
    const h = this.hsl.get('h') as FormControl;
    h.setValue(hsl.h);
    const s = this.hsl.get('s') as FormControl;
    s.setValue(hsl.s);
    const l = this.hsl.get('l') as FormControl;
    l.setValue(hsl.l);
  }
}
