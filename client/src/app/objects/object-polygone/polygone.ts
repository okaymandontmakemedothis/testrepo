import { DrawingObject } from '../../../../../common/communication/drawing';
import { RGBA } from '../../model/rgba.model';
import { IObjects } from '../IObjects';

/// Classe pour créer les objets ellipses
export class PolygoneObject implements IObjects {
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
      this.getPoints();
      const points: string = this.getPointsString(this.points);
      return '<polygon id="' + this.id
      + '" points="' + points
      + '" style=' + this.getStyle() + ' />';
    }
    return '';
  }

  get points(): {x: number, y: number}[] {
    /// return the array
    return this._points;
  }

  set points(points: {x: number, y: number}[]) {
    this._points = points;
  }

  private getPoints() {
    /// reset array from previous values
    this.points = [];
    /// determine circle angles
    const angle = 360 / this.vertexNumber;
    /// determine radius
    const radius = this.width / 2;
    /// determine x and y from origin and initial angle
    this.getPointsXandY(radius, 0);
    /// repeat last step but add angle as you go for the n-1 remaining sides/points
    let angleToAdd = 0;
    for (let i = 1; i < this.vertexNumber; i++ ) {
      angleToAdd += angle;
      this.getPointsXandY(radius, angleToAdd);
    }
  }

  getPointsXandY(radius: number, angleToAdd: number) {
    const y = this.y + this.height / 2 + radius * Math.sin(this.getRAD((this.initialAngle + angleToAdd) % 360));
    console.log(this.getRAD((this.initialAngle + angleToAdd) % 360));
    const x = this.x + this.width / 2 + radius * Math.cos(this.getRAD((this.initialAngle + angleToAdd) % 360));
    this.points.push({x, y});
  }

  getRAD(angle: number) {
    return angle * Math.PI / 180;
  }

  getPointsString(points: {x: number, y: number}[]) {
    let tempString = '';
    for (const point of points) {
      tempString += point.x + ',' + point.y + ' ';
    }
    console.log(tempString);
    return tempString;
  }

  /// Retourne le drawing object pour un ellipse
  toDrawingObject(): DrawingObject {
    const drawingObject = {
      type: 'polygone',
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
