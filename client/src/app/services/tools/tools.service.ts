import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ToolsColorService } from '../tools-color/tools-color.service';
import { ITools } from './ITools';
import { PencilToolService } from './pencil-tool/pencil-tool.service';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

  selectedTools: ITools;
  currentObject: null | IObjects;
  private isPressed = false;
  tools: ITools[] = [];

  constructor(private drawing: DrawingService, private colorTool: ToolsColorService, private pencilTool: PencilToolService) {
    this.initTools();
    this.selectedTools = this.tools[0];
  }

  private initTools(): void {
    this.tools.push(this.pencilTool);
  }

  selectTool(id: number): void {
    this.currentObject = null;
    this.selectedTools = this.tools[id];
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
    this.isPressed = true;
    if (this.currentObject) {
      this.currentObject.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.currentObject.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.drawing.addObject(this.currentObject);
    }
  }

  onRelease(event: MouseEvent): void {
    }
    this.isPressed = false;
  }

  onMove(event: MouseEvent): void {
    if (this.isPressed) {
      this.drawing.draw();
    }
  }
}
