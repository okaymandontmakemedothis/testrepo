import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/polyline';
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

  constructor() {
    this.strokeWidth = new FormControl(20);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
    });
  }

  onPressed(event: MouseEvent): IObjects {
    this.object = new Polyline({ x: event.offsetX, y: event.offsetY }, this.strokeWidth.value);
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
