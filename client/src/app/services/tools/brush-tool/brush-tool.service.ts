import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPaintBrush, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/object-polyline/polyline';
import { ITools } from '../ITools';
import { Point } from 'src/app/model/point.model';
import { ITexture } from 'src/app/textures/ITexture';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';

@Injectable({
  providedIn: 'root',
})
export class BrushToolService implements ITools {
  readonly id = 1;
  readonly faIcon: IconDefinition = faPaintBrush;
  readonly toolName = 'Brush Tool';
  private object: Polyline | null;
  private strokeWidth: FormControl;
  private texture: FormControl;
  private lastPoint: Point = { x: 0, y: 0 };
  parameters: FormGroup;

  constructor(private texturesService: TexturesService,
    private offsetManager: OffsetManagerService,
    private colorTool: ToolsColorService) {
    this.strokeWidth = new FormControl(20);
    this.texture = new FormControl(this.texturesService.firstTexture.value);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      texture: this.texture,
    });
  }

  private addPoint(dpoint: Point) {
    if (this.object) {
      this.lastPoint = { x: this.lastPoint.x + dpoint.x, y: this.lastPoint.y + dpoint.y };
      this.object.addPoint(this.lastPoint);
    }
  }

  onPressed(event: MouseEvent): IObjects {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.lastPoint = { x: offset.x, y: offset.y };
    const texture: ITexture = this.texturesService.returnTexture(this.texture.value);
    this.object = new Polyline(this.lastPoint, this.strokeWidth.value, texture);
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
