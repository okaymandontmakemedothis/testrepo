import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { IObjects } from 'src/app/objects/IObjects';

@Injectable({
  providedIn: 'root'
})
export class ToolPointerService implements ITools {

  id: number = 0;

  name:string = "Point";

  onPressed($event: MouseEvent): IObjects {
    return null;
  }

  onRelease($event: MouseEvent): string {
    return "Release";
  }

  onMove($event: MouseEvent): string {
    return "Move";
  }

  constructor() { }
}
