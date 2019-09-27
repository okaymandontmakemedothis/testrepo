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
  oldX: number = 0;
  oldY: number = 0;

  height: number = 0;
  width: number = 0;

  strokeWidth: number = 0;
  style: string = "";

  private isSquare: boolean = false;

  setSquare() {
    this.isSquare = true;

    this.setSize(this.oldX, this.oldY);
  }
  unsetSquare() {
    this.isSquare = false;

    this.setSize(this.oldX, this.oldY);
  }

  setSize(x: number, y: number): void {
    this.oldX = x;
    this.oldY = y;

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

    if (this.isSquare) {
      if (y < this.firstY && x < this.firstX) {
        if (this.width < this.height) {
          this.height = this.width;
          this.y = this.firstY - this.width;
        }
        else {
          this.width = this.height;
          this.x = this.firstX - this.height;
        }
      }
      else if (this.width < this.height) {
        this.height = this.width;
        if (y < this.firstY) {
          this.y = this.firstX + this.firstY - x;
        }
      }
      else {
        this.width = this.height;
        if (x < this.firstX) {
          this.x = this.firstX + this.firstY - y;
        }
      }
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
    if (this.strokeWidth > 0)
      return "<rect id=\"" + this.id + "\" x=\"" + this.x + "\" y=\"" + this.y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" style=" + this.getStyle() + " />"
    return "";
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
