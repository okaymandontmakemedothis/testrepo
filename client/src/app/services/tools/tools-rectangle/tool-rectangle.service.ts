import { Injectable } from '@angular/core';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root'
})
export class ToolRectangleService implements ITools {
  id:number = 1;
  isDown:boolean = false;

  onPressed(): void {
    this.isDown = true;
    console.log("down");
  }

  onRelease(): void {
    this.isDown = false;
    console.log("up");
  }
  onMove(): void {
    if(this.isDown)
      console.log("moving");
  }

  constructor() { }
}
