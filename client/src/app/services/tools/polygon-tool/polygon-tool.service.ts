import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faDrawPolygon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { Polyline } from 'src/app/objects/object-polyline/polyline';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class PolygonService implements ITools {

  readonly toolName = 'Outil Polygon';
  readonly faIcon: IconDefinition = faDrawPolygon;
  readonly id = ToolIdConstants.POLYGON_ID;
  private object: Polyline | null;
  private strokeWidth: FormControl;
  private lastPoint: Point;
  parameters: FormGroup;

  constructor() { }

  onPressed(event: MouseEvent): import("../../../objects/IObjects").IObjects | null {
    throw new Error("Method not implemented.");
  }
  onRelease(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMove(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
}
