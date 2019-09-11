import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {

  @Input() group: FormGroup;

  hue = 180;
  hsl: { h: number, s: number, v: number } = { h: 180, s: 1, v: 1 };
  rgb: { r: number, g: number, b: number } = { r: 255, g: 255, b: 255 };
  a = 1;
  color: string;
}
