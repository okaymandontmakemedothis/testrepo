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

  strokeWidth: number;

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

  setStroke(width: number): void {
    this.strokeWidth = width;
  }

  draw(): string {

    return "<rect x=\"" + this.x + "\" y=\"" + this.y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" style=\"fill:rgb(" + this.primaryColor.rgb.r + "," + this.primaryColor.rgb.g + "," + this.primaryColor.rgb.b + ");stroke-width:10;stroke-alignment:inner;stroke:rgb(" + this.secondaryColor.rgb.r + "," + this.secondaryColor.rgb.g + "," + this.secondaryColor.rgb.b + ")\" />"
  }

  getColor(): void {
    throw new Error("Method not implemented.");
  }

  constructor(x: number, y: number) { this.firstX = x; this.x = x; this.firstY = y; this.y = y; }
}