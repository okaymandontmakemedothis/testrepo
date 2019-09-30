import { Component } from '@angular/core';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { RGB } from 'src/app/model/rgb.model';
import { COLOR_SQUARE_HEIGHT, COLOR_SQUARE_STROKE_WIDTH, COLOR_SQUARE_WIDTH } from '../color-picker.constant';

@Component({
  selector: 'app-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent {

  /// Valeur pour l'affichage
  readonly height = COLOR_SQUARE_HEIGHT;
  readonly width = COLOR_SQUARE_WIDTH;
  readonly strokeWidth = COLOR_SQUARE_STROKE_WIDTH;

  constructor(private colorPickerService: ColorPickerService) { }

  get rgbString(): string {
    const rgb: RGB = this.colorPickerService.rgb.value;
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }

  get a(): number {
    return this.colorPickerService.a.value;
  }
}
