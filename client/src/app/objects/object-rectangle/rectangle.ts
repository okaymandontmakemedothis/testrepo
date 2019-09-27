import { RGBA } from '../../model/rgba.model';
import { IObjects } from '../IObjects';

export class RectangleObject implements IObjects {
  primaryColor: RGBA;
  secondaryColor: RGBA;
  id = 1;

  firstX = 0;
  firstY = 0;
  x = 0;
  y = 0;

  height = 0;
  width = 0;

  strokeWidth = 0;
  style = '';

  getStyle(): string {
    switch (this.style) {
      case 'center': {
        return '"fill:rgba(' + this.primaryColor.rgb.r + ',' + this.primaryColor.rgb.g + ',' + this.primaryColor.rgb.b + ',' + this.primaryColor.a + ')"';
      }
      case 'border': {
        return '"fill:none;stroke-width:' + this.strokeWidth + ';stroke:rgb(' + this.secondaryColor.rgb.r + ',' + this.secondaryColor.rgb.g + ',' + this.secondaryColor.rgb.b + ',' + this.secondaryColor.a + ')"';

      }
      case 'fill': {
        return '"fill:rgb(' + this.primaryColor.rgb.r + ',' + this.primaryColor.rgb.g + ',' + this.primaryColor.rgb.b + ',' + this.primaryColor.a + ');stroke-width:' + this.strokeWidth + ';stroke:rgb(' + this.secondaryColor.rgb.r + ',' + this.secondaryColor.rgb.g + ',' + this.secondaryColor.rgb.b + ',' + this.secondaryColor.a + ')"';
      }
      default: {
        return '';
      }
    }
  }

  draw(): string {
    if (this.strokeWidth > 0) {
      return '<rect id="' + this.id + '" x="' + this.x + '" y="' + this.y + '" width="' + this.width + '" height="' + this.height + '" style=' + this.getStyle() + ' />';
    }
    return '';
  }

  constructor(x: number, y: number, strokeWidth: number, style: string) {
    this.firstX = x; this.x = x;
    this.firstY = y; this.y = y;

    this.strokeWidth = strokeWidth;
    this.style = style;
  }
}
