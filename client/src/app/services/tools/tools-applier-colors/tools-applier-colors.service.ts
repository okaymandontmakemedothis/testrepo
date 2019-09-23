import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from '../../../model/rgba.model';

import { isObject } from 'util';
import { ColorRgbaHexComponent } from 'src/app/color-picker/color-rgba-hex/color-rgba-hex.component';



@Injectable({
  providedIn: 'root'
})
export class ToolsApplierColorsService implements ITools {
  // id: number;
  // onPressed($event: MouseEvent): IObjects;
  // onRelease($event: MouseEvent): void;
  // onMove($event: MouseEvent): void;
  id:number =2;
  name:string = "Applier";
  onPressed($event:MouseEvent):string{
    console.log($event);

    return "objet";
  }
  onRelease($event: MouseEvent): string{
    return "";
  }
  onMove($event: MouseEvent): string{
    return "";
  }



  constructor() { }
}
