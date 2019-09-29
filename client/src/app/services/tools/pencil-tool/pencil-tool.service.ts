import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/object-polyline/polyline';
import { FormGroup, FormControl } from '@angular/forms';
import { IconDefinition, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root',
})
export class PencilToolService implements ITools {
  readonly toolName = 'Pencil Tool';
  readonly faIcon: IconDefinition = faPencilAlt;
  readonly id = 0;
  private object: Polyline | null;
  private strokeWidth: FormControl;
  private lastPoint: Point;
  parameters: FormGroup;

  constructor() {
    this.strokeWidth = new FormControl(20);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
    });
  }

  addPoint(dpoint: Point) {
    if (this.object) {
      this.lastPoint = { x: this.lastPoint.x + dpoint.x, y: this.lastPoint.y + dpoint.y };
      this.object.addPoint(this.lastPoint);
    }
  }

  onPressed(event: MouseEvent): IObjects {
    this.lastPoint = { x: event.offsetX, y: event.offsetY };
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
