
import { RGBA } from '../../model/rgba.model';

/// Classe pour créer les objets ellipses
export class PolygoneObject {
  primaryColor: RGBA;
  secondaryColor: RGBA;
  id = 1;
  x = 0;
  y = 0;

  height = 0;
  width = 0;

  vertexNumber = 0;
  initialAngle = 270;
  // tslint:disable-next-line: variable-name
  _points: {x: number, y: number}[];

  strokeWidth = 0;
  style = '';

  constructor(x: number, y: number, vertexNumber: number, strokeWidth: number, style: string) {
    this.x = x;
    this.y = y;
    this.vertexNumber = vertexNumber;
    if (this.vertexNumber === 4) {
      this.initialAngle = 315;
    }
    this.strokeWidth = strokeWidth;
    this.style = style;
  }

  /// Pour retourner la ligne svg de l'ellipse pour le dessiner

  get points(): {x: number, y: number}[] {
    /// return the array
    return this._points;
  }

  set points(points: {x: number, y: number}[]) {
    this._points = points;
  }


}
