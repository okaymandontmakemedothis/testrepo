import { Injectable, HostListener } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from '../../../model/rgba.model';
import { ITools } from '../ITools';
import { ColorRgbaHexComponent } from 'src/app/color-picker/color-rgba-hex/color-rgba-hex.component';
import { isObject } from 'util';
import { TargetLocator } from 'selenium-webdriver';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { TemplateBindingParseResult } from '@angular/compiler';

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
  object: IObjects;
  onPressed($event: MouseEvent): string {
      if ($event.button === 0) { // left click so set fill to a color
        console.log($event.target);
        const target = $event.target as Element;
        target.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,255)');
        console.log(target);

      } else {     // right click so set stroke to a color
        document.addEventListener('contextmenu', ($event2) => {
          $event2.preventDefault(); // prevents the context menu of a right click to show
        });
        console.log($event.target);
      }
      return this.object.draw($event);
  }
  onRelease($event: MouseEvent): string {
    return this.object.draw($event);
  }
  onMove($event: MouseEvent): string {
    return this.object.draw($event);
  }

 
  constructor() { }
}
