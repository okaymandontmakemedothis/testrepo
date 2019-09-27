import { IObjects } from '../IObjects';
import { RGBA } from "../../model/rgba.model";

export class RectangleObject implements IObjects {
  primaryColor: RGBA;
  secondaryColor: RGBA;
  id: number = 1;

  firstX: number = 0
  firstY: number = 0
  x: number = 0;
  y: number = 0;

  height: number = 0;
  width: number = 0;

  strokeWidth: number = 0;
  style: string = "";


  getStyle(): string {
    switch (this.style) {
      case "center": {
        return "\"fill:rgba(" + this.primaryColor.rgb.r + "," + this.primaryColor.rgb.g + "," + this.primaryColor.rgb.b + "," + this.primaryColor.a + ")\"";
      }
      case "border": {
        return "\"fill:none;stroke-width:" + this.strokeWidth + ";stroke:rgb(" + this.secondaryColor.rgb.r + "," + this.secondaryColor.rgb.g + "," + this.secondaryColor.rgb.b + "," + this.secondaryColor.a + ")\"";

      }
      case "fill": {
        return "\"fill:rgb(" + this.primaryColor.rgb.r + "," + this.primaryColor.rgb.g + "," + this.primaryColor.rgb.b + "," + this.primaryColor.a + ");stroke-width:" + this.strokeWidth + ";stroke:rgb(" + this.secondaryColor.rgb.r + "," + this.secondaryColor.rgb.g + "," + this.secondaryColor.rgb.b + "," + this.secondaryColor.a + ")\"";
      }
      default: {
        return "";
      }
    }
  }

  draw(): string {
    if (this.strokeWidth > 0)
      return "<rect id=\"" + this.id + "\" x=\"" + this.x + "\" y=\"" + this.y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" style=" + this.getStyle() + " />"
    return "";
  }

  constructor(x: number, y: number, strokeWidth: number, style: string) {
    this.firstX = x; this.x = x;
    this.firstY = y; this.y = y;

    this.strokeWidth = strokeWidth;
    this.style = style;
  }
}
