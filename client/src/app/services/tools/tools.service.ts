<<<<<<< HEAD
import { Injectable} from '@angular/core';
import { ITools } from './ITools';
import { ToolPointerService } from './tool-pointer/tool-pointer.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';
=======
import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ToolsColorService } from '../tools-color/tools-color.service';
import { ITools } from './ITools';
>>>>>>> master

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

<<<<<<< HEAD
  constructor() {
    this.toolsList.push(new ToolPointerService());
    this.toolsList.push(new ToolRectangleService());
    this.toolsList.push(new ToolsApplierColorsService());
  }

  toolSelectedID = 0;
=======
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
>>>>>>> master

  toolsList: ITools[] = [];

  toolSelected(id: number) {
    this.toolSelectedID = id;
  }
}
