import { Injectable, HostListener } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from '../../../model/rgba.model';
import { ITools } from '../ITools';
import { ColorRgbaHexComponent } from 'src/app/color-picker/color-rgba-hex/color-rgba-hex.component';
import { isObject } from 'util';

@Injectable({
  providedIn: 'root',
})
export class ToolsApplierColorsService implements ITools {
  // id: number;
  // onPressed($event: MouseEvent): IObjects;
  // onRelease($event: MouseEvent): void;
  // onMove($event: MouseEvent): void;
  id = 2;
  name = 'Applier';
  onPressed($event: MouseEvent): string {
      if ($event.button === 0) { // left click so set fill to a color
        console.log($event.target);
      } else {     // right click so set stroke to a color
        document.addEventListener('contextmenu', ($event2) => {
          $event2.preventDefault(); // prevents the context menu of a right click to show
        });
        console.log($event.target);
      }
    
    return 'objet';
  }
  onRelease($event: MouseEvent): string {
    return '';
  }
  onMove($event: MouseEvent): string {
    return '';
  }

 
  constructor() { }
}
