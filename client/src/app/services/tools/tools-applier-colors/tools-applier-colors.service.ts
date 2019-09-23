import { Injectable } from '@angular/core';
import { ITools } from '../ITools';


@Injectable({
  providedIn: 'root'
})
export class ToolsApplierColorsService implements ITools {
  // id: number;
  // onPressed($event: MouseEvent): IObjects;
  // onRelease($event: MouseEvent): void;
  // onMove($event: MouseEvent): void;
  id:number =2;
  name:string = "Applier"l
  onPressed($event:MouseEvent):string{
    return ""
  }
  
  constructor() { }
}
