import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root'
})
export class ToolRectangleService implements ITools {
  id = 1;

  name = 'Rect';

  object: RectangleObject | null;

  onPressed(event: MouseEvent): IObjects {
    this.object = new RectangleObject(event.offsetX, event.offsetY);
    return this.object;
  }

  onRelease(event: MouseEvent): void {
    this.object = null;
  }

  onMove(event: MouseEvent): void {
    if (this.object) {
      this.object.setSize(event.offsetX, event.offsetY);
    }
  }

  constructor() { }
}