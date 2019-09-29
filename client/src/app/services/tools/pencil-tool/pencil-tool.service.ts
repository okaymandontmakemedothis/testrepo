import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/polyline';
import { FormGroup, FormControl } from '@angular/forms';
import { IconDefinition, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { ITools } from '../ITools';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';

@Injectable({
  providedIn: 'root',
})
export class PencilToolService implements ITools {
  toolName = 'Pencil Tool';
  faIcon: IconDefinition = faPencilAlt;
  readonly id = 0;
  private object: Polyline | null;
  parameters: FormGroup;
  strokeWidth: FormControl;
  lastPoint: Point;

  constructor(private offsetManager: OffsetManagerService, private colorTool: ToolsColorService) {
    this.strokeWidth = new FormControl(20);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
    });
  }

  private addPoint(dpoint: Point) {
    if (this.object) {
      if (this.lastPoint) {
        this.lastPoint = { x: this.lastPoint.x + dpoint.x, y: this.lastPoint.y + dpoint.y };
      } else {
        this.lastPoint = dpoint;
      }
      this.object.addPoint(this.lastPoint);
    }
  }

  onPressed(event: MouseEvent): IObjects {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.lastPoint = { x: offset.x, y: offset.y };
    this.object = new Polyline(this.lastPoint, this.strokeWidth.value);
    if (event.button === 0) {
      this.object.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
    } else {
      this.object.primaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
    }
    return this.object;
  }

  onRelease(event: MouseEvent): void {
    this.object = null;
    this.lastPoint = { x: 0, y: 0 };
  }

  onMove(event: MouseEvent): void {
    if (this.object) {
      this.addPoint({ x: event.movementX, y: event.movementY });
    }
  }
}
