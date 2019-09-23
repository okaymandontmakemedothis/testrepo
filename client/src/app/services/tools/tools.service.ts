import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ITools } from './ITools';
import { ToolsColorService } from '../tools-color/tools-color.service';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

  selectedTools: ITools;
  currentObject: null | IObjects;
  tools: ITools[] = [];

  constructor(private drawing: DrawingService, private colorTool: ToolsColorService) {
    // this.selectedTools = this.tools[0];
    // private initTools(): void {
    //   this.tools.push(tool1);
    // }
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
    this.currentObject = null;
  }

  onMove(event: MouseEvent): void {
    this.selectedTools.onMove(event);
  }
}
