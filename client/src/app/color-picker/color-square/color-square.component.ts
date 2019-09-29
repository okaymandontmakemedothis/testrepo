import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { RGB } from 'src/app/model/rgb.model';

@Component({
  selector: 'app-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent {

  constructor(private colorPickerService: ColorPickerService) {
  }

  get rgbString(): string {
    const rgb: RGB = this.colorPickerService.rgb.value;
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }

  get a(): FormControl {
    return this.colorPickerService.a;
  }
}
