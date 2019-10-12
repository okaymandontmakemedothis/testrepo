import { ElementRef, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
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

  private object: ElementRef | null;
  private contour: ElementRef | null;
  private contourId: number;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private ellipseStyle: FormControl;

  private isCircle = false;
  oldX = 0;
  oldY = 0;
  x: number;
  y: number;

  constructor(private offsetManager: OffsetManagerService, private colorTool: ToolsColorService, private drawingService: DrawingService) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.ellipseStyle = new FormControl('fill');
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      ellipseStyle: this.ellipseStyle,
    });
  }

  /// Quand le bouton de la sourie est enfoncé, on crée un ellipse et on le retourne
  /// en sortie et est inceré dans l'objet courrant de l'outil.
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      this.contour = this.drawingService.renderer.createElement('rect', 'svg');
      this.drawingService.renderer.setStyle(this.contour, 'stroke', `rgba(0, 0, 0, 1)`);
      this.drawingService.renderer.setStyle(this.contour, 'stroke-width', `1`);
      this.drawingService.renderer.setStyle(this.contour, 'stroke-dasharray', `10,10`);
      this.drawingService.renderer.setStyle(this.contour, 'd', `M5 40 l215 0`);
      this.drawingService.renderer.setStyle(this.contour, 'fill', `none`);
      this.contourId = this.drawingService.addObject(this.contour as ElementRef);

      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);

      this.x = offset.x;
      this.y = offset.y;
      this.oldX = offset.x;
      this.oldY = offset.y;

      this.object = this.drawingService.renderer.createElement('ellipse', 'svg');
      this.drawingService.renderer.setAttribute(this.object, 'cx', this.x.toString());
      this.drawingService.renderer.setAttribute(this.object, 'cy', this.y.toString());

      this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
      this.drawingService.renderer.setStyle(this.object, 'stroke-alignment', 'outer');

      if (event.button === 0) {
        this.setStyle();
      } else {
        this.setStyle(false);
      }

      this.drawingService.addObject(this.object as ElementRef);
    }
  }

  /// Quand le bouton de la sourie est relaché, l'objet courrant de l'outil est mis a null.
  onRelease(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      this.object = null;
      this.isCircle = false;
      if (this.contour) {
        this.drawingService.removeObject(this.contourId);
        this.contourId = 0;
      }
    }
  }

  /// Quand le bouton de la sourie est apuyé et on bouge celle-ci, l'objet courrant subit des modifications.
  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (this.object) {
      this.setSize(offset.x, offset.y);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey && this.object) {
      this.isCircle = true;
      this.setSize(this.oldX, this.oldY);
    }
  }
  onKeyUp(event: KeyboardEvent) {
    if (!event.shiftKey && this.object) {
      this.isCircle = false;
      this.setSize(this.oldX, this.oldY);
    }
  }

  /// Transforme le size de l'objet courrant avec un x et un y en entrée
  private setSize(mouseX: number, mouseY: number): void {
    if (this.object) {
      this.oldX = mouseX;
      this.oldY = mouseY;

      let width = mouseX - this.x - this.strokeWidth.value;
      let height = mouseY - this.y - this.strokeWidth.value;

      const cx = this.x + width / 2;
      const cy = this.y + height / 2;

      this.drawingService.renderer.setAttribute(this.object, 'cx', (cx + this.strokeWidth.value / 2).toString());
      this.drawingService.renderer.setAttribute(this.object, 'cy', (cy + this.strokeWidth.value / 2).toString());

      this.drawingService.renderer.setAttribute(this.contour, 'x', (this.x).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'y', (this.y).toString());

      if (width < 0) {
        this.drawingService.renderer.setAttribute(this.object, 'cx', (cx + this.strokeWidth.value / 2).toString());
        this.drawingService.renderer.setAttribute(this.contour, 'x', (mouseX).toString());
        width = Math.abs(width) - 2 * this.strokeWidth.value;
      }
      if (height < 0) {
        this.drawingService.renderer.setAttribute(this.object, 'cy', (cy + this.strokeWidth.value / 2).toString());
        this.drawingService.renderer.setAttribute(this.contour, 'y', (mouseY).toString());
        height = Math.abs(height) - 2 * this.strokeWidth.value;
      }

      if (this.isCircle) {
        if (mouseY < this.y && mouseX < this.x) {
          if (width < height) {
            height = width;
            this.drawingService.renderer.setAttribute(this.object, 'cy', (this.y - width / 2 - this.strokeWidth.value / 2).toString());
            this.drawingService.renderer.setAttribute(this.contour, 'y', (this.y - width - this.strokeWidth.value).toString());
          } else {
            width = height;
            this.drawingService.renderer.setAttribute(this.object, 'cx', (this.x - height / 2 - this.strokeWidth.value / 2).toString());
            this.drawingService.renderer.setAttribute(this.contour, 'x', (this.x - height - this.strokeWidth.value).toString());
          }
        } else if (width < height) {
          height = width;
          if (mouseY < this.y) {
            this.drawingService.renderer.setAttribute(this.object, 'cy',
              (this.x + this.y - mouseX + width / 2 + this.strokeWidth.value / 2).toString());
            this.drawingService.renderer.setAttribute(this.contour, 'y',
              (this.x + this.y - mouseX).toString());
          } else {
            this.drawingService.renderer.setAttribute(this.object, 'cy',
              (this.y + width / 2 + this.strokeWidth.value / 2).toString());
          }
        } else {
          width = height;
          if (mouseX < this.x) {
            this.drawingService.renderer.setAttribute(this.object, 'cx',
              (this.x + this.y - mouseY + height / 2 + this.strokeWidth.value / 2).toString());
            this.drawingService.renderer.setAttribute(this.contour, 'x',
              (this.x + this.y - mouseY).toString());
          } else {
            this.drawingService.renderer.setAttribute(this.object, 'cx',
              (this.x + height / 2 + this.strokeWidth.value / 2).toString());
          }
        }
      }

      if (width < 0) {
        width = 0;
      }
      if (height < 0) {
        height = 0;
      }

      this.drawingService.renderer.setAttribute(this.object, 'rx', (width / 2).toString());
      this.drawingService.renderer.setAttribute(this.object, 'ry', (height / 2).toString());

      this.drawingService.renderer.setAttribute(this.contour, 'width', (width + this.strokeWidth.value).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'height', (height + this.strokeWidth.value).toString());
    }
  }

  private setStyle(isLeft: boolean = true) {
    switch (this.ellipseStyle.value) {
      case 'center': {
        if (isLeft) {
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.primaryAlpha}`);
        } else {
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.secondaryAlpha}`);
        }
        return;
      }
      case 'border': {
        this.drawingService.renderer.setStyle(this.object, 'fill', `none`);
        if (isLeft) {
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);
        } else {
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.primaryAlpha}`);
        }
        return;
      }
      case 'fill': {
        if (isLeft) {
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b})`);
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.primaryAlpha}`);
          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);
        } else {
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b})`);
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.primaryAlpha}`);
          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.secondaryAlpha}`);
        }
        return;
      }
      default: {
        return;
      }
    }
  }
}
