import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPaintBrush, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/polyline';
import { ITools } from '../ITools';
import { Point } from 'src/app/model/point.model';
import { ITexture } from 'src/app/textures/ITexture';
import { TexturesService } from 'src/app/services/textures/textures.service';

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

  constructor(private texturesService: TexturesService) {
    this.strokeWidth = new FormControl(20);
    this.texture = new FormControl(this.texturesService.firstTexture.value);
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
    const texture: ITexture = this.texturesService.returnTexture(this.texture.value);
    this.object = new Polyline(this.lastPoint, this.strokeWidth.value, texture);
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
