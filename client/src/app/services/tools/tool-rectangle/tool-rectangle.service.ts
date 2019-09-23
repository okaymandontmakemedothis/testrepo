import { Injectable } from '@angular/core';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root',
})
export class ToolRectangleService implements ITools {
  id = 1;

  name = 'Rect';

  object: RectangleObject = new RectangleObject(0, 0);

  onPressed($event: MouseEvent): string {
    this.object = new RectangleObject($event.offsetX, $event.offsetY);
    return this.object.svgLine;
  }

  onRelease($event: MouseEvent): string {
    console.log(this.object.svgLine);
    return this.object.draw($event);
  }

  onMove($event: MouseEvent): string {
    return this.object.draw($event);

  }

  constructor() { }
}
