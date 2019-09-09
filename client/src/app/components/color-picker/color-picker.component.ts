import { Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {

  hue: { r: number, g: number, b: number };
  rgb: { r: number, g: number, b: number } = { r: 255, g: 255, b: 255 };
  a = 1;
  color: string;

}
