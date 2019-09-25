import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ToolsColorService } from '../tools-color/tools-color.service';
import { ITools } from './ITools';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
import { ToolPointerService } from './tool-pointer/tool-pointer.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

  constructor(private drawing: DrawingService, private colorTool: ToolsColorService) {
    this.tools.push(new ToolsApplierColorsService(drawing));
    this.tools.push(new ToolRectangleService());
    this.selectedTools = this.tools[0];
    // this.selectedTools = this.tools[0];
    // private initTools(): void {
    //   this.tools.push(tool1);
    // }
  }

  selectedTools: ITools;
  currentObject: undefined | IObjects;
  tools: ITools[] = [];
  toolSelectedID = 0;

  toolSelected(id: number) {
    this.selectedTools = this.tools[id];
  }
  onPressed(event: MouseEvent): void {
    this.currentObject = this.selectedTools.onPressed(event);
    if (this.currentObject) {
      this.currentObject.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.currentObject.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.drawing.addObject(this.currentObject);
    }
  }

  onRelease(event: MouseEvent): void {
    this.selectedTools.onRelease(event);
    this.currentObject = undefined;
  }

  onMove(event: MouseEvent): void {
    this.selectedTools.onMove(event);
  }
}
