import { Injectable } from '@angular/core';
import { DrawingService } from '../drawing/drawing.service';
import { ITools } from './ITools';
import { IObjects } from 'src/app/objects/IObjects';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {

  selectedTools: ITools;
  currentObject: null | IObjects;
  tools: ITools[] = [];

  constructor(private drawing: DrawingService) {
    // this.selectedTools = this.tools[0];
    // private initTools(): void {
    //   this.tools.push(tool1);
    // }
  }

  onPressed(event: MouseEvent): void {
    this.currentObject = this.selectedTools.onPressed(event);
    if (this.currentObject) {
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
