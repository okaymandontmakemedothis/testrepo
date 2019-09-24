import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ITools } from './ITools';
import { ToolsColorService } from '../tools-color/tools-color.service';
import { ToolPointerService } from './tool-pointer/tool-pointer.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private drawing: DrawingService, private colorTool: ToolsColorService) {
    // this.selectedTools = this.tools[0];
    // private initTools(): void {
    //   this.tools.push(tool1);
    // }

    this.tools.push(new ToolPointerService());
    this.tools.push(new ToolRectangleService());
  }

  toolSelected(id:number){
    this.selectedTools = this.tools[id];
  }

  selectedTools: ITools;
  currentObject: null | IObjects;
  tools: ITools[] = [];


  onPressed(event: MouseEvent): void {
    this.currentObject = this.selectedTools.onPressed(event);
    if (this.currentObject) {
      this.currentObject.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.currentObject.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.drawing.addObject(this.currentObject);
    }
  }

  toolSelectedID:number = 0;
}