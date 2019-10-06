import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { EllipseObject } from 'src/app/objects/object-ellipse/ellipse';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

/// Outil pour créer des ellipse, click suivis de bouge suivis de relache crée l'ellipse
/// et avec shift créer un cercle
@Injectable({
  providedIn: 'root',
})
export class ToolEllipseService implements ITools {
  readonly faIcon: IconDefinition = faCircle;
  readonly toolName = 'Outil Ellipse';
  readonly id = ToolIdConstants.ELLIPSE_ID;

  private object: EllipseObject | null;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private ellipseStyle: FormControl;

  private isCircle = false;
  oldX = 0;
  oldY = 0;
  firstX: number;
  firstY: number;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService, private colorTool: ToolsColorService) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.ellipseStyle = new FormControl('fill');
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      ellipseStyle: this.ellipseStyle,
    });
    this.registerEventListenerOnShift();
  }

  /// Quand le bouton shift et peser, l'ellipse se transforme en cercle et quand on lache le bouton, il redevient ellipse.
  private registerEventListenerOnShift() {
    window.addEventListener('keydown', (event) => {
      if (event.shiftKey && this.object) {
        this.setCircle();
        this.drawingService.draw();
      }
    });

    window.addEventListener('keyup', (event) => {
      if (!event.shiftKey && this.object) {
        this.unsetCircle();
        this.drawingService.draw();
      }
    });
  }

  /// Quand le bouton de la sourie est enfoncé, on crée un ellipse et on le retourne
  /// en sortie et est inceré dans l'objet courrant de l'outil.
  onPressed(event: MouseEvent): IObjects {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.firstX = offset.x;
    this.firstY = offset.y;
    this.object = new EllipseObject(offset.x, offset.y, this.firstY - offset.y, this.firstX - offset.x,
      this.strokeWidth.value, this.ellipseStyle.value);
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

  /// Active le mode cercle et assigne le size.
  private setCircle() {
    this.isCircle = true;
    this.setSize(this.oldX, this.oldY);
  }

  /// Désactive le mode cercle et assigne le size.
  private unsetCircle() {
    this.isCircle = false;
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

      if (this.isCircle) {
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