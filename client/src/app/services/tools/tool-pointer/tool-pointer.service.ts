import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { IObjects } from 'src/app/objects/IObjects';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';

@Injectable({
  providedIn: 'root'
})
export class ToolPointerService implements ITools {

  id: number = 0;

  name:string = "Point";

  onPressed(event: MouseEvent): IObjects {
    return new RectangleObject(0,0);
  }

  onRelease(event: MouseEvent): string {
    return "Release";
  }

  onMove(event: MouseEvent): string {
    return "Move";
  }

  constructor() { }
}
