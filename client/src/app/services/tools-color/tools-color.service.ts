import { Injectable } from '@angular/core';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA, RGBA } from '../../model/rgba.model';

/// Service permettant de choisir des couleurs pour les outils
@Injectable({
  providedIn: 'root',
})
export class ToolsColorService {

  primaryColor: RGB = { r: 0, g: 0, b: 0 };
  primaryAlpha = DEFAULT_ALPHA;
  secondaryColor: RGB = DEFAULT_RGB_COLOR;
  secondaryAlpha = DEFAULT_ALPHA;
  lastSelectedColors: RGBA[] = [];

  constructor() {
    this.initLastSelectedColorsList();
  }

  /// Retourne la couleur primaire sous forme de string
  get primaryColorString(): string {
    return 'rgb(' + this.primaryColor.r + ',' + this.primaryColor.g + ',' + this.primaryColor.b + ')';
  }

  /// Retourne la couleur secondaire sous forme de string
  get secondaryColorString(): string {
    return 'rgb(' + this.secondaryColor.r + ',' + this.secondaryColor.g + ',' + this.secondaryColor.b + ')';
  }

  /// Initialise la liste des dernieres couleurs choisies
  private initLastSelectedColorsList() {
    for (let i = 0; i < 9; i++) {
      this.lastSelectedColors.push({ rgb: DEFAULT_RGB_COLOR, a: DEFAULT_ALPHA });
    }
    this.lastSelectedColors.push({ rgb: { r: 0, g: 0, b: 0 }, a: DEFAULT_ALPHA });
  }

  /// Défini la couleur primaire
  setPrimaryColor(pc: RGB, a: number) {
    this.primaryColor = pc;
    this.primaryAlpha = a;
    this.addLastSelectedColor({ rgb: pc, a });
  }

  /// Défini la couleur secondaire
  setSecondaryColor(sc: RGB, a: number) {
    this.secondaryColor = sc;
    this.secondaryAlpha = a;
    this.addLastSelectedColor({ rgb: sc, a });
  }

  /// Ajoute les couleurs selectionnés à la liste lorsqu'une couleur est choisi, si elle existe déjà, elle n'est pas ajouté
  private addLastSelectedColor(rgba: RGBA) {
    if (!this.lastSelectedColors.find((rgbaColor: RGBA) => {
      return (rgbaColor.rgb.r === rgba.rgb.r && rgbaColor.rgb.g === rgba.rgb.g && rgbaColor.rgb.b === rgba.rgb.b && rgbaColor.a === rgba.a);
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
