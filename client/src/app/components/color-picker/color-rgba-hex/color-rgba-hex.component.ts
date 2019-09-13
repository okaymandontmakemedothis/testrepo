import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorTransformer } from 'src/app/color-transformer';

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

  @Output()
  color: EventEmitter<{ hsl: { h: number, s: number, l: number }, a: number }> = new EventEmitter(true);

  ngOnInit(): void {
    this.rgb = this.colorForm.get('rgb') as FormGroup;
    this.hsl = this.colorForm.get('hsl') as FormGroup;
    this.hsl.valueChanges.subscribe((value) => this.hslChangeUpdate());
    this.hslChangeUpdate();
  }

  hslChangeUpdate() {
    const rgb = ColorTransformer.hsl2rgb({
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
    this.hex = '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16);
  }

  changedHEX() {
    const rgb = ColorTransformer.hex2rgb(this.hex);
    const hsl = ColorTransformer.rgb2hsl(rgb);
    (this.colorForm.get('hsl') as FormGroup).setValue(hsl);
  }
}
