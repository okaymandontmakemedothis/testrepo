import { DrawingObject } from '../../../../../common/communication/drawing';
import { RGBA } from '../../model/rgba.model';
import { IObjects } from '../IObjects';

/// Classe pour créer les objets ellipses
export class EllipseObject implements IObjects {
  primaryColor: RGBA;
  secondaryColor: RGBA;
  id = 1;
  x = 0;
  y = 0;

  height = 0;
  width = 0;

  strokeWidth = 0;
  style = '';

  constructor(x: number, y: number, height: number, width: number, strokeWidth: number, style: string) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.strokeWidth = strokeWidth;
    this.style = style;
  }

  /// Pour definir le style du l'ellipse (complet, contour, centre)
  getStyle(): string {
    switch (this.style) {
      case 'center': {
        return '"fill:rgba('
          + this.primaryColor.rgb.r + ',' + this.primaryColor.rgb.g + ',' + this.primaryColor.rgb.b + ',' + this.primaryColor.a + ')"';
      }
      case 'border': {
        return '"fill:none;stroke-width:' + this.strokeWidth +
          ';stroke:rgb(' +
          this.secondaryColor.rgb.r +
          ',' + this.secondaryColor.rgb.g + ',' + this.secondaryColor.rgb.b + ',' + this.secondaryColor.a + ')"';

      }
      case 'fill': {
        return '"fill:rgb(' +
          this.primaryColor.rgb.r + ',' + this.primaryColor.rgb.g + ',' + this.primaryColor.rgb.b +
          ',' + this.primaryColor.a + ');stroke-width:' + this.strokeWidth + ';stroke:rgb('
          + this.secondaryColor.rgb.r + ',' + this.secondaryColor.rgb.g + ',' + this.secondaryColor.rgb.b +
          ',' + this.secondaryColor.a + ')"';
      }
      default: {
        return '';
      }
    }
  }

  /// Pour retourner la ligne svg de l'ellipse pour le dessiner
  draw(): string {
    if (this.strokeWidth > 0) {
      const cx = (this.x + this.width / 2);
      const cy = (this.y + this.height / 2);
      return '<ellipse id="' + this.id + '" cx="' + cx +
        '" cy="' + cy + '" rx="' + (this.width / 2) + '" ry="' + (this.height / 2) + '" style=' + this.getStyle() + ' />';
    }
    return '';
  }

  /// Retourne le drawing object pour un ellipse
  toDrawingObject(): DrawingObject {
    const drawingObject = {
      type: 'ellipse',
      objectId: this.id,
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
      primaryRGBA: this.primaryColor,
      secondaryRGBA: this.secondaryColor,
      pointsList: [],
      strokeWidth: this.strokeWidth,
      testureId: 0,
      style: this.style,
    };
    return drawingObject;
  }
}
