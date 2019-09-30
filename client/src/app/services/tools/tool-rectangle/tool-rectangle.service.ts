import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class ToolRectangleService implements ITools {
  readonly faIcon: IconDefinition = faSquareFull;
  readonly toolName = 'Rectangle Tool';
  readonly id = ToolIdConstants.RECTANGLE_ID;

  private object: RectangleObject | null;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private rectStyle: FormControl;

  private isSquare = false;
  oldX = 0;
  oldY = 0;
  firstX: number;
  firstY: number;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService, private colorTool: ToolsColorService) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.rectStyle = new FormControl('fill');
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      rectStyle: this.rectStyle,
    });
    this.registerEventListenerOnShift();
  }

  /// Quand le bouton shift et peser, le rectangle se transforme en carree et quand on lache le bouton, il redevient rectangle.
  private registerEventListenerOnShift() {
    window.addEventListener('keydown', (event) => {
      if (event.shiftKey && this.object) {
        this.setSquare();
        this.drawingService.draw();
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.shiftKey && this.object) {
        if (this.object) {
          this.unsetSquare();
          this.drawingService.draw();
        }
      }
    });
  }

  /// Quand le bouton de la sourie est enfoncé, on crée un rectangle et on le retourne
  /// en sortie et est inceré dans l'objet courrant de l'outil.
  onPressed(event: MouseEvent): IObjects {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.firstX = offset.x;
    this.firstY = offset.y;
    this.object = new RectangleObject(offset.x, offset.y, this.strokeWidth.value, this.rectStyle.value);
    if (event.button === 0) {
      this.object.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
    } else {
      this.object.primaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
    }
    return this.object;
  }

  /// Quand le bouton de la sourie est relaché, l'objet courrant de l'outil est mis a null.
  onRelease(event: MouseEvent): void {
    this.object = null;
  }

  /// Quand le bouton de la sourie est apuyé et on bouge celle-ci, l'objet courrant subit des modifications.
  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.setSize(offset.x, offset.y);
  }

  /// Active le mode carré et assigne le size.
  private setSquare() {
    this.isSquare = true;
    this.setSize(this.oldX, this.oldY);
  }

  /// Désactive le mode carré et assigne le size.
  private unsetSquare() {
    this.isSquare = false;
    this.setSize(this.oldX, this.oldY);
  }

  /// Transforme le size de l'objet courrant avec un x et un y en entrée
  private setSize(x: number, y: number): void {
    if (this.object) {
      this.oldX = x;
      this.oldY = y;

      this.object.width = x - this.firstX;
      this.object.height = y - this.firstY;

      if (this.object.width < 0) {
        this.object.x = x;
        this.object.width = this.firstX - this.object.x;
      }
      if (this.object.height < 0) {
        this.object.y = y;
        this.object.height = this.firstY - this.object.y;
      }

      if (this.isSquare) {
        if (y < this.firstY && x < this.firstX) {
          if (this.object.width < this.object.height) {
            this.object.height = this.object.width;
            this.object.y = this.firstY - this.object.width;
          } else {
            this.object.width = this.object.height;
            this.object.x = this.firstX - this.object.height;
          }
        } else if (this.object.width < this.object.height) {
          this.object.height = this.object.width;
          if (y < this.firstY) {
            this.object.y = this.firstX + this.firstY - x;
          }
        } else {
          this.object.width = this.object.height;
          if (x < this.firstX) {
            this.object.x = this.firstX + this.firstY - y;
          }
        }
      }
    }
  }
}
