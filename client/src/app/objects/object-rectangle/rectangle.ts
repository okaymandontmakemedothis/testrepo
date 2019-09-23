import { IObjects } from '../IObjects';
import { IShapes } from '../IShapes';

export class RectangleObject implements IObjects, IShapes{
  id:number = 1;

  firstX:number = 0
  firstY:number = 0

  x: number = 0;
  y: number = 0;
  height: number = 0;
  width: number = 0;

  strokeWidth:number;

  r:number;
  g:number;
  b:number;

  svgLine:string = "<rect x=\"" + this.x + "\" y=\"" + this.y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" style=\"fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,255)\" />";

  draw($event:MouseEvent): string {
    this.width = $event.offsetX - this.firstX;
    this.height = $event.offsetY - this.firstY;

    if(this.width < 0){
      this.x = $event.offsetX;
      this.width = this.firstX - this.x;
    }
    if(this.height < 0){
      this.y = $event.offsetY;
      this.height = this.firstY - this.y;
    }

    return "<rect x=\"" + this.x + "\" y=\"" + this.y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" style=\"fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,255)\" />"
  }

  getColor(): void {
    throw new Error("Method not implemented.");
  }

  constructor(x:number, y:number) { this.firstX = x; this.x = x; this.firstY = y; this.y = y; }
}
