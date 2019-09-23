import { IObjects } from '../IObjects';
import { IShapes } from '../IShapes';

export class RectangleObject implements IObjects, IShapes{
  id:number = 1;

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
    this.width = this.x + $event.screenX;
    this.height = this.y + $event.screenY;
    return this.svgLine;
  }

  getColor(): void {
    throw new Error("Method not implemented.");
  }

  constructor(x:number, y:number) { this.x=x; this.y=y }
}
