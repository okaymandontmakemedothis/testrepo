import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/polyline';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ITools } from '../ITools';

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

  constructor(private offsetManager: OffsetManagerService) {
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
