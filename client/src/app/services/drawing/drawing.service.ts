import { Injectable } from '@angular/core';
import { RGBA } from 'src/app/tools-color.model';
import { RGB } from 'src/rgb.model';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  created = false;

  color: RGB = { r: 255, g: 255, b: 255 };
  alpha = 1;

  setDrawingColor(rgba: RGBA) {
    this.color = rgba.rgb;
    this.alpha = rgba.a;
  }

  get colorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
  }
}
