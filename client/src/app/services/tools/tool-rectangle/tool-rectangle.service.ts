import { Injectable } from '@angular/core';
import { ITools } from '../ITools';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { IObjects } from 'src/app/objects/IObjects';
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { DrawingService } from '../../drawing/drawing.service';

@Injectable({
  providedIn: 'root'
})
export class ToolRectangleService implements ITools {
  faIcon: IconDefinition = faSquareFull;
  toolName: string = "Rectangle Tool";
  parameters: FormGroup;
  strokeWidth: FormControl;
  rectStyle: FormControl;

  readonly id = 3;

  object: RectangleObject | null;

  constructor(private drawingService: DrawingService) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.rectStyle = new FormControl("fill");

    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      rectStyle: this.rectStyle,
    });

    this.onShift();
  }

  onShift() {
    window.addEventListener('keydown', (event) => {
      if (event.shiftKey && this.object) {
        this.object.setSquare();
        this.drawingService.draw();
      }
    });

    window.addEventListener('keyup', () => {
      if (this.object) {
        this.object.unsetSquare();
        this.drawingService.draw();
      }
    });
  }

  onPressed(event: MouseEvent): IObjects {
    this.object = new RectangleObject(event.offsetX, event.offsetY, this.strokeWidth.value, this.rectStyle.value);
    return this.object;
  }

  onRelease(event: MouseEvent): void {
    this.object = null
  }

  onMove(event: MouseEvent): void {
    if (this.object) {
      this.object.setSize(event.offsetX, event.offsetY);
    }
  }

}

/*function lowLimit(limit: number): Validators {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const forbidden = limit > control.value;
    return forbidden ? { 'ooo': true } : null;
  };
}*/
