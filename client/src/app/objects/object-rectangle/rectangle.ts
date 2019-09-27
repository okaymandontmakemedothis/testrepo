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

  setSize(x: number, y: number): void {
    this.width = x - this.firstX;
    this.height = y - this.firstY;

    if (this.width < 0) {
      this.x = x;
      this.width = this.firstX - this.x;
    }
    if (this.height < 0) {
      this.y = y;
      this.height = this.firstY - this.y;
    }
  }

  getStyle(): string {
    switch (this.style) {
      case "center": {
        return "\"fill:rgba(" + this.primaryColor.rgb.r + "," + this.primaryColor.rgb.g + "," + this.primaryColor.rgb.b + "," + this.primaryColor.a + ")\"";
      }
      case "border": {
        return "\"fill:rgba(0, 0, 0, 0);stroke-width:" + this.strokeWidth + ";stroke:rgb(" + this.secondaryColor.rgb.r + "," + this.secondaryColor.rgb.g + "," + this.secondaryColor.rgb.b + "," + this.secondaryColor.a + ")\"";

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

    return "<rect x=\"" + this.x + "\" y=\"" + this.y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" style=" + this.getStyle() + " />"
  }

  getColor(): void {
    throw new Error("Method not implemented.");
  }

  constructor(x: number, y: number, strokeWidth: number, style: string) {
    this.firstX = x; this.x = x;
    this.firstY = y; this.y = y;

    this.strokeWidth = strokeWidth;
    this.style = style;
  }
}
