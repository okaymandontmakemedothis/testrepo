import { Injectable, HostListener } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { RGBA } from '../../../model/rgba.model';
import { ITools } from '../ITools';
import { ColorRgbaHexComponent } from 'src/app/color-picker/color-rgba-hex/color-rgba-hex.component';
import { isObject } from 'util';
import { TargetLocator } from 'selenium-webdriver';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { TemplateBindingParseResult } from '@angular/compiler';
import { DrawingService } from '../../drawing/drawing.service';

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
  onPressed($event: MouseEvent): IObjects {
      const target = $event.target as Element;
      if ($event.button === 0) { // left click so set fill to a color
        console.log($event.target);
        target.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,255)');

      } else {     // right click so set stroke to a color
        document.addEventListener('contextmenu', ($event2) => {
          $event2.preventDefault(); // prevents the context menu of a right click to show
        });
        console.log($event.target);
      }

      this.drawing.getObject(Number(target.id)); // this should return an IObjects (but it doesn't yet in the function from drawingService)
      // this.object = this.drawing.getObject()...
      this.object.draw(); // function from IObjects
      return this.object;
  }
  onRelease($event: MouseEvent) {}
  onMove($event: MouseEvent) {}

  constructor(private drawing: DrawingService) { }
}
