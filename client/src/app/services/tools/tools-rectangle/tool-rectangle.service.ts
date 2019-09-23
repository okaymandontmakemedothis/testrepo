import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';

@Injectable({
  providedIn: 'root'
})
export class ToolRectangleService implements ITools {
  id:number = 1;
  isDown:boolean = false;
  object:RectangleObject = new RectangleObject(0,0);

  onPressed($event:MouseEvent): string {
    this.isDown = true;
    this.object = new RectangleObject($event.clientX, $event.clientY)
    console.log(this.object.svgLine)
    return this.object.svgLine;
  }

  onRelease($event:MouseEvent): string {
    this.isDown = false;
    console.log(this.object.svgLine)
    return this.object.draw($event);
  }

  onMove($event:MouseEvent): string | void {
    //if(this.isDown)
      //return this.object.draw($event);
    
  }

  constructor() { }
}
