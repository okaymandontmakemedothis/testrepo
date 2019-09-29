import { Injectable } from '@angular/core';
import { RGB } from 'src/app/model/rgb.model';
import { RGBA } from '../../model/rgba.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsColorService {

  primaryColor: RGB = { r: 0, g: 0, b: 0 };
  primaryAlpha = 1;
  secondaryColor: RGB = { r: 255, g: 255, b: 255 };
  secondaryAlpha = 1;
  lastSelectedColors: RGBA[] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.lastSelectedColors.push({ rgb: { r: 255, g: 255, b: 255 }, a: 1 });
    }
    this.lastSelectedColors.push({ rgb: { r: 0, g: 0, b: 0 }, a: 1 });
  }

  get primaryColorString(): string {
    return 'rgb(' + this.primaryColor.r + ',' + this.primaryColor.g + ',' + this.primaryColor.b + ')';
  }

  get secondaryColorString(): string {
    return 'rgb(' + this.secondaryColor.r + ',' + this.secondaryColor.g + ',' + this.secondaryColor.b + ')';
  }

  setPrimaryColor(pc: RGB, a: number) {
    this.primaryColor = pc;
    this.primaryAlpha = a;
    this.addLastSelectedColor({ rgb: pc, a });
  }

  setSecondaryColor(sc: RGB, a: number) {
    this.secondaryColor = sc;
    this.secondaryAlpha = a;
    this.addLastSelectedColor({ rgb: sc, a });
  }

  private addLastSelectedColor(rgba: RGBA) {
    if (!this.lastSelectedColors.find((el: RGBA) => {
      return (el.rgb.r === rgba.rgb.r && el.rgb.g === rgba.rgb.g && el.rgb.b === rgba.rgb.b && el.a === rgba.a);
    })) {
      if (this.lastSelectedColors.length >= 10) {
        this.lastSelectedColors.shift();
      }
      this.lastSelectedColors.push(rgba);
    }
  }

  switchColor() {
    const tempColor = this.primaryColor;
    const tempAlpha = this.primaryAlpha;
    this.primaryColor = this.secondaryColor;
    this.primaryAlpha = this.secondaryAlpha;
    this.secondaryColor = tempColor;
    this.secondaryAlpha = tempAlpha;
  }
}
