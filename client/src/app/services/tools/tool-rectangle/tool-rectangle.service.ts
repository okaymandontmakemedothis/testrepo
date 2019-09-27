import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { DrawingService } from '../../drawing/drawing.service';
import { ITools } from '../ITools';

@Injectable({
  providedIn: 'root',
})
export class ToolRectangleService implements ITools {

  constructor(private drawingService: DrawingService) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.rectStyle = new FormControl('fill');

    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      rectStyle: this.rectStyle,
    });

    this.onShift();
  }
  faIcon: IconDefinition = faSquareFull;
  toolName = 'Rectangle Tool';
  parameters: FormGroup;
  strokeWidth: FormControl;
  rectStyle: FormControl;

  readonly id = 3;

  object: RectangleObject | null;

  private isSquare = false;
  oldX = 0;
  oldY = 0;

  onShift() {
    window.addEventListener('keydown', (event) => {
      if (event.shiftKey && this.object) {
        this.setSquare();
        this.drawingService.draw();
      }
    });

    window.addEventListener('keyup', () => {
      if (this.object) {
        this.unsetSquare();
        this.drawingService.draw();
      }
    });
  }

  onPressed(event: MouseEvent): IObjects {
    this.object = new RectangleObject(event.offsetX, event.offsetY, this.strokeWidth.value, this.rectStyle.value);
    return this.object;
  }

  onRelease(event: MouseEvent): void {
    this.object = null;
  }

  onMove(event: MouseEvent): void {
    if (this.object) {
      this.setSize(event.offsetX, event.offsetY);
    }
  }

  setSquare() {
    this.isSquare = true;

    this.setSize(this.oldX, this.oldY);
  }

  unsetSquare() {
    this.isSquare = false;

    this.setSize(this.oldX, this.oldY);
  }

  setSize(x: number, y: number): void {
    if (this.object) {
      this.oldX = x;
      this.oldY = y;

      this.object.width = x - this.object.firstX;
      this.object.height = y - this.object.firstY;

      if (this.object.width < 0) {
        this.object.x = x;
        this.object.width = this.object.firstX - this.object.x;
      }
      if (this.object.height < 0) {
        this.object.y = y;
        this.object.height = this.object.firstY - this.object.y;
      }

      if (this.isSquare) {
        if (y < this.object.firstY && x < this.object.firstX) {
          if (this.object.width < this.object.height) {
            this.object.height = this.object.width;
            this.object.y = this.object.firstY - this.object.width;
          } else {
            this.object.width = this.object.height;
            this.object.x = this.object.firstX - this.object.height;
          }
        } else if (this.object.width < this.object.height) {
          this.object.height = this.object.width;
          if (y < this.object.firstY) {
            this.object.y = this.object.firstX + this.object.firstY - x;
          }
        } else {
          this.object.width = this.object.height;
          if (x < this.object.firstX) {
            this.object.x = this.object.firstX + this.object.firstY - y;
          }
        }
      }
    }
  }
}
