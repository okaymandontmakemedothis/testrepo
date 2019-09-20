import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';

@Component({
  selector: 'app-color-rgba-hex',
  templateUrl: './color-rgba-hex.component.html',
  styleUrls: ['./color-rgba-hex.component.scss'],
})
export class ColorRgbaHexComponent implements OnInit {

  @Input()
  colorForm: FormGroup;

  hex: string;
  rgb: FormGroup;
  hsl: FormGroup;

  private subs: Subscription;

  constructor(private colorTransformer: ColorTransformerService) { }

  ngOnInit(): void {
    this.rgb = this.colorForm.get('rgb') as FormGroup;
    this.hsl = this.colorForm.get('hsl') as FormGroup;
    this.subs = this.hsl.valueChanges.subscribe((value) => this.hslChangeUpdate());
    this.hslChangeUpdate();
  }

  hslChangeUpdate() {
    const rgb = this.colorTransformer.hsl2rgb({
      h: (this.hsl.get('h') as FormControl).value,
      s: (this.hsl.get('s') as FormControl).value,
      l: (this.hsl.get('l') as FormControl).value,
    });
    this.updateHEX(rgb);
    this.updateRGB(rgb);
  }

  updateRGB(rgb: { r: number, g: number, b: number }) {
    this.rgb.setValue(rgb);
  }

  updateHEX(rgb: { r: number, g: number, b: number }) {
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
    this.hex = '#' + r + g + b;
  }

  changedHEX() {
    const rgb = this.colorTransformer.hex2rgb(this.hex);
    const hsl = this.colorTransformer.rgb2hsl(rgb);
    this.subs.unsubscribe();
    this.updateRGB(rgb);
    this.hsl.setValue(hsl);
    this.subs = this.hsl.valueChanges.subscribe((value) => this.hslChangeUpdate());
  }

  updateHSL() {
    const r = this.rgb.get('r') as FormControl;
    const g = this.rgb.get('g') as FormControl;
    const b = this.rgb.get('b') as FormControl;
    const hsl = this.colorTransformer.rgb2hsl({ r: r.value, g: g.value, b: b.value });
    this.subs.unsubscribe();
    this.hsl.setValue(hsl);
    this.updateHEX({ r: r.value, g: g.value, b: b.value });
    this.subs = this.hsl.valueChanges.subscribe((value) => this.hslChangeUpdate());
  }
}
