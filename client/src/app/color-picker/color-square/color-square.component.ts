import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';

@Component({
  selector: 'app-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent {

  constructor(private colorPickerService: ColorPickerService) {
  }

  get rgbString(): string {
    return this.colorPickerService.rgbString;
  }

  get a(): FormControl {
    return this.colorPickerService.a;
  }
}
