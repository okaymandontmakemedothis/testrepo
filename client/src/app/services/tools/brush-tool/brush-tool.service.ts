import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { IconDefinition, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { FormGroup, FormControl } from '@angular/forms';
import { Polyline } from 'src/app/objects/polyline';
import { Point } from 'src/app/model/point.model';

export interface TextureOptions {
  value: number;
  viewValue: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrushToolService implements ITools {
  readonly id = 1;
  faIcon: IconDefinition = faPaintBrush;
  toolName = 'Brush Tool';
  parameters: FormGroup;
  private object: Polyline | null;
  strokeWidth: FormControl;
  texture: FormControl;
  lastPoint: Point = { x: 0, y: 0 };
  textureList: TextureOptions[] = [
    { value: 0, viewValue: 'Texture 1' },
    { value: 1, viewValue: 'Texture 2' },
    { value: 2, viewValue: 'Texture 3' },
    { value: 3, viewValue: 'Texture 4' },
    { value: 4, viewValue: 'Texture 5' },
  ];

  constructor() {
    this.strokeWidth = new FormControl(20);
    this.texture = new FormControl(this.textureList[0].value);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      texture: this.texture,
    });
  }

  addPoint(dpoint: Point) {
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
    this.lastPoint = { x: event.offsetX, y: event.offsetY };
    this.object = new Polyline(this.lastPoint, this.strokeWidth.value, this.texture.value);
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
