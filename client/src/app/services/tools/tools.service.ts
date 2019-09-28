import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../drawing/drawing.service';
import { ToolsColorService } from '../tools-color/tools-color.service';
import { BrushToolService } from './brush-tool/brush-tool.service';
import { ITools } from './ITools';
import { PencilToolService } from './pencil-tool/pencil-tool.service';
import { ToolRectangleService } from './tool-rectangle/tool-rectangle.service';
import { ToolsApplierColorsService } from './tools-applier-colors/tools-applier-colors.service';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

  selectedToolId = 0;
  currentObject: null | IObjects;
  private isPressed = false;
  tools: ITools[] = [];

  constructor(private drawing: DrawingService, private colorTool: ToolsColorService, private pencilTool: PencilToolService, private brushTool: BrushToolService,
    private colorApplicator: ToolsApplierColorsService, private rectangleTool: ToolRectangleService) {
    this.initTools();
  }

  private initTools(): void {
    this.tools.push(this.pencilTool);
    this.tools.push(this.brushTool);
    this.tools.push(this.colorApplicator);
    this.tools.push(this.rectangleTool);
  }

  selectTool(id: number): void {
    this.currentObject = null;
    this.selectedToolId = id;
  }

  get selectedTool(): ITools {
    return this.tools[this.selectedToolId];
  }

  onPressed(event: MouseEvent): void {
    this.currentObject = this.selectedTool.onPressed(event);
    this.isPressed = true;
    if (this.currentObject) {
      this.currentObject.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.currentObject.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.drawing.addObject(this.currentObject);
    }
  }

  onRelease(event: MouseEvent): void {
    if (this.isPressed) {
      this.selectedTool.onRelease(event);
      this.currentObject = null;
      this.drawing.draw();
    }
    this.isPressed = false;
  }

  onMove(event: MouseEvent): void {
    if (this.isPressed) {
      this.selectedTool.onMove(event);
      this.drawing.draw();
    }
  }
}
