import { ElementRef, Injectable, Renderer2 } from '@angular/core';
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
  onPressed(event: MouseEvent, renderer: Renderer2): ElementRef | null {
    if (event.button === 0 || event.button === 2) {

      this.contour = renderer.createElement('rect', 'svg');
      renderer.setStyle(this.contour, 'stroke', `rgba(0, 0, 0, 1)`);
      renderer.setStyle(this.contour, 'stroke-width', `1`);
      renderer.setStyle(this.contour, 'fill', `none`);
      renderer.appendChild(this.drawingService.drawing, this.contour);

      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);

      this.x = offset.x;
      this.y = offset.y;
      this.object = renderer.createElement('ellipse', 'svg');
      renderer.setAttribute(this.object, 'cx', this.x.toString());
      renderer.setAttribute(this.object, 'cy', this.y.toString());

      renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
      renderer.setStyle(this.object, 'stroke-alignment', 'outer');

      if (event.button === 0) {
        this.setStyle(renderer);
      } else {
        this.setStyle(renderer, false);
      }
    }
    return this.object;
  }

  /// Quand le bouton de la sourie est relaché, l'objet courrant de l'outil est mis a null.
  onRelease(event: MouseEvent, renderer: Renderer2): void {
    this.object = null;
    this.isCircle = false;
    if (this.contour) {
      renderer.removeChild(this.drawingService.drawing, this.contour);
    }
  }

  /// Quand le bouton de la sourie est apuyé et on bouge celle-ci, l'objet courrant subit des modifications.
  onMove(event: MouseEvent, renderer: Renderer2): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (this.object) {
      this.setSize(offset.x, offset.y, renderer);
    }
  }

  onKeyDown(event: KeyboardEvent, renderer: Renderer2) {
    if (event.shiftKey && this.object) {
      this.isCircle = true;
      this.setSize(this.oldX, this.oldY, renderer);
    }
  }
  onKeyUp(event: KeyboardEvent, renderer: Renderer2) {
    if (!event.shiftKey && this.object) {
      this.isCircle = false;
      this.setSize(this.oldX, this.oldY, renderer);
    }
  }

  /// Transforme le size de l'objet courrant avec un x et un y en entrée
  private setSize(mouseX: number, mouseY: number, renderer: Renderer2): void {
    if (this.object) {
      this.oldX = mouseX;
      this.oldY = mouseY;

      let width = mouseX - this.x - this.strokeWidth.value / 2;
      let height = mouseY - this.y - this.strokeWidth.value / 2;

      const cx = this.x + width / 2;
      const cy = this.y + height / 2;

      renderer.setAttribute(this.object, 'cx', cx.toString());
      renderer.setAttribute(this.object, 'cy', cy.toString());

      renderer.setAttribute(this.contour, 'x', (this.x - this.strokeWidth.value / 2).toString());
      renderer.setAttribute(this.contour, 'y', (this.y - this.strokeWidth.value / 2).toString());

      if (width < 0) {
        renderer.setAttribute(this.object, 'cx', cx.toString());
        renderer.setAttribute(this.contour, 'x', (mouseX - this.strokeWidth.value / 2).toString());
        width = Math.abs(width);
      }
      if (height < 0) {
        renderer.setAttribute(this.object, 'cy', cy.toString());
        renderer.setAttribute(this.contour, 'y', (mouseY - this.strokeWidth.value / 2).toString());
        height = Math.abs(height);
      }

      if (this.isCircle) {
        if (mouseY < this.y && mouseX < this.x) {
          if (width < height) {
            height = width;
            renderer.setAttribute(this.object, 'cy', (this.y - width).toString());
            renderer.setAttribute(this.contour, 'y', (this.y - width - this.strokeWidth.value / 2).toString());
          } else {
            width = height;
            renderer.setAttribute(this.object, 'cx', (this.x - height).toString());
            renderer.setAttribute(this.contour, 'x', (this.x - height - this.strokeWidth.value / 2).toString());
          }
        } else if (width < height) {
          height = width;
          if (mouseY < this.y) {
            renderer.setAttribute(this.object, 'cy', (this.x + this.y - mouseX).toString());
            renderer.setAttribute(this.contour, 'y', (this.x + this.y - mouseX - this.strokeWidth.value / 2).toString());
          }
        } else {
          width = height;
          if (mouseX < this.x) {
            renderer.setAttribute(this.object, 'cx', (this.x + this.y - mouseY).toString());
            renderer.setAttribute(this.contour, 'x', (this.x + this.y - mouseY - this.strokeWidth.value / 2).toString());
          }
        }
      }

      renderer.setAttribute(this.object, 'rx', (width / 2).toString());
      renderer.setAttribute(this.object, 'ry', (height / 2).toString());

      renderer.setAttribute(this.contour, 'width', (width + this.strokeWidth.value).toString());
      renderer.setAttribute(this.contour, 'height', (height + this.strokeWidth.value).toString());
    }
  }

  private setStyle(renderer: Renderer2, isLeft: boolean = true) {
    switch (this.ellipseStyle.value) {
      case 'center': {
        if (isLeft) {
          renderer.setStyle(this.object, 'fill', `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b},${this.colorTool.primaryAlpha})`);
        } else {
          renderer.setStyle(this.object, 'fill', `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b},${this.colorTool.secondaryAlpha})`);
        }
        return;
      }
      case 'border': {
        renderer.setStyle(this.object, 'fill', `none`);
        if (isLeft) {
          renderer.setStyle(this.object, 'stroke', `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b},${this.colorTool.secondaryAlpha})`);
        } else {
          renderer.setStyle(this.object, 'stroke', `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b},${this.colorTool.primaryAlpha})`);
        }
        return;
      }
      case 'fill': {
        if (isLeft) {
          renderer.setStyle(this.object, 'fill', `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b},${this.colorTool.primaryAlpha})`);
          renderer.setStyle(this.object, 'stroke', `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b},${this.colorTool.secondaryAlpha})`);
        } else {
          renderer.setStyle(this.object, 'stroke', `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b},${this.colorTool.primaryAlpha})`);
          renderer.setStyle(this.object, 'fill', `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b},${this.colorTool.secondaryAlpha})`);
        }
        return;
      }
      default: {
        return;
      }
    }
  }
}
