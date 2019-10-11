import { RGBA } from '../../model/rgba.model';
import { IObjects } from '../IObjects';

/// Classe pour créer les objets rectangles
const defaultHeight = 50;
const defaultWidth = 50;
export class EtampeObject implements IObjects {
  primaryColor: RGBA;
  secondaryColor: RGBA;
  id = 1;
  x = 0;
  y = 0;

  strokeWidth = 0;

  height = defaultHeight;
  width = defaultWidth;
  angle = 0;
  url = '';

  constructor(x: number, y: number, url: string) {
    this.x = x;
    this.y = y;
    this.url = url;
  }

  getRotation() {
    return '" transform=' + 'rotate(' + this.angle + ',' + this.x + ',' + this.y + ')';
  }

  /// Pour retourner la ligne svg du rectangle pour le dessiner
  draw(): string {
    const x = (this.x - this.width / 2);
    const y = (this.y - this.height / 2);
    return '<image id="' + this.id + '" x="' + x +
      '" y="' + y + '" width="' + this.width + '" height="' + this.height + '" xlink:href=' + this.url + this.getRotation() + ' />';

  }

  toDrawingObject() {
    const drawingObject = {
      type: 'etampe',
      objectId: this.id,
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
      primaryRGBA: this.primaryColor,
      secondaryRGBA: this.secondaryColor,
      pointsList: [],
      strokeWidth: 0,
      testureId: 0,
      style: this.url,
    };
    return drawingObject;
  }
}
