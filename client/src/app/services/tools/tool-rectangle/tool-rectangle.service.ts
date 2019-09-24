import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { IObjects } from 'src/app/objects/IObjects';

@Injectable({
  providedIn: 'root'
})
export class ToolRectangleService implements ITools {
  id:number = 1;

  name:string = "Rect";

  object:RectangleObject = new RectangleObject(0,0);

  onPressed($event:MouseEvent): IObjects {
    this.object = new RectangleObject($event.offsetX, $event.offsetY)
    return this.object;
  }

  onRelease($event:MouseEvent): string {
    console.log(this.object.svgLine)
    return this.object.draw($event);
  }

  onMove($event:MouseEvent): string{
    return this.object.draw($event);
    
  }

  constructor() { }
}
