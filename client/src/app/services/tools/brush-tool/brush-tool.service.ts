import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPaintBrush, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/polyline';
import { ITools } from '../ITools';

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

  onPressed(event: MouseEvent): IObjects {
    this.object = new Polyline({ x: event.offsetX, y: event.offsetY }, this.strokeWidth.value, this.texture.value);
    return this.object;
  }
  onRelease(event: MouseEvent): void {
    this.object = null;
  }

  onMove(event: MouseEvent): void {
    if (this.object) {
      this.object.addPoint({ x: event.movementX, y: event.movementY });
    }
  }
}
