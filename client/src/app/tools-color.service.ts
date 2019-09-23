import { Injectable } from '@angular/core';
import { RGB } from 'src/rgb.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsColorService {

  primaryColor: RGB = { r: 0, g: 0, b: 0 };
  primaryAlpha = 1;
  secondaryColor: RGB = { r: 255, g: 255, b: 255 };
  secondaryAlpha = 1;
  lastSelectedColors: { rgb: RGB, a: number }[] = [];

  setPrimaryColor(pc: RGB, a: number) {
    this.primaryColor = pc;
    this.primaryAlpha = a;
    if (this.lastSelectedColors.length >= 10) {
      this.lastSelectedColors.shift();
    }
    this.lastSelectedColors.push({ rgb: pc, a });
  }

  get primaryColorString() {
    return 'rgb(' + this.primaryColor.r + ',' + this.primaryColor.g + ',' + this.primaryColor.b + ')';
  }

  get secondaryColorString() {
    return 'rgb(' + this.secondaryColor.r + ',' + this.secondaryColor.g + ',' + this.secondaryColor.b + ')';
  }

  setSecondaryColor(sc: RGB, a: number) {
    this.secondaryColor = sc;
    this.secondaryAlpha = a;
    if (this.lastSelectedColors.length >= 10) {
      this.lastSelectedColors.shift();
    }
    this.lastSelectedColors.push({ rgb: sc, a });
  }

  switchColor() {
    const tempColor = this.primaryColor;
    console.log(tempColor);
    const tempAlpha = this.primaryAlpha;
    this.primaryColor = this.secondaryColor;
    this.primaryAlpha = this.secondaryAlpha;
    this.secondaryColor = tempColor;
    this.secondaryAlpha = tempAlpha;
  }
}
