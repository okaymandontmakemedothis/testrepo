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
import { ToolsColorService } from '../../tools-color/tools-color.service';

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
  object: IObjects | undefined; 
  onPressed($event: MouseEvent): IObjects | undefined {
      const target = $event.target as Element;
      this.object = this.drawing.getObject(Number(target.id));
      if (this.object) {
         if ($event.button === 0) { // left click so set fill to a color
        this.object.primaryColor = {rgb: this.color.primaryColor, a:this.color.primaryAlpha};
      } else {     // right click so set stroke to a color
        document.addEventListener('contextmenu', ($event2) => {
          $event2.preventDefault(); // prevents the context menu of a right click to show
        });
        this.object.secondaryColor = { rgb: this.color.secondaryColor, a: this.color.secondaryAlpha };
      }
    }
      return this.object;
  }
  onRelease($event: MouseEvent) { }
  onMove($event: MouseEvent) { }

  constructor(private drawing: DrawingService, private color: ToolsColorService) { }
}
