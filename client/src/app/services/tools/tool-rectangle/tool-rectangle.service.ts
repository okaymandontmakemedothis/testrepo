import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

/// Outil pour créer des rectangle, click suivis de bouge suivis de relache crée le rectangle
/// et avec shift créer un carrée
@Injectable({
  providedIn: 'root',
})
export class ToolRectangleService implements ITools {
  readonly faIcon: IconDefinition = faSquareFull;
  readonly toolName = 'Outil Rectangle';
  readonly id = ToolIdConstants.RECTANGLE_ID;

  private object: ElementRef | null;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private rectStyle: FormControl;

  private isSquare = false;
  oldX = 0;
  oldY = 0;

  x: number;
  y: number;

  constructor(
    private offsetManager: OffsetManagerService,
    private colorTool: ToolsColorService,
  ) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.rectStyle = new FormControl('fill');
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      rectStyle: this.rectStyle,
    });
  }

  /// Quand le bouton de la sourie est enfoncé, on crée un rectangle et on le retourne
  /// en sortie et est inceré dans l'objet courrant de l'outil.
  onPressed(event: MouseEvent, renderer: Renderer2): ElementRef | null {
    if (event.button === 0 || event.button === 2) {

      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.x = offset.x;
      this.y = offset.y;
      this.object = renderer.createElement('rect', 'svg');
      renderer.setAttribute(this.object, 'x', this.x.toString());
      renderer.setAttribute(this.object, 'y', this.y.toString());

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
    this.isSquare = false;
  }

  /// Quand le bouton de la sourie est apuyé et on bouge celle-ci, l'objet courrant subit des modifications.
  onMove(event: MouseEvent, renderer: Renderer2): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (this.object) {
      this.setSize(offset.x, offset.y, renderer);
    }
  }

  onKeyDown(event: KeyboardEvent, renderer: Renderer2): void {
    if (event.shiftKey && this.object) {
      this.isSquare = true;
      this.setSize(this.oldX, this.oldY, renderer);
    }
  }

  onKeyUp(event: KeyboardEvent, renderer: Renderer2): void {
    if (!event.shiftKey && this.object) {
      this.isSquare = false;
      this.setSize(this.oldX, this.oldY, renderer);
    }
  }

  /// Transforme le size de l'objet courrant avec un x et un y en entrée
  private setSize(mouseX: number, mouseY: number, renderer: Renderer2): void {
    if (this.object) {
      this.oldX = mouseX;
      this.oldY = mouseY;

      let width = mouseX - this.x - this.strokeWidth.value;
      let height = mouseY - this.y - this.strokeWidth.value;

      renderer.setAttribute(this.object, 'x', (this.x + this.strokeWidth.value / 2).toString());
      renderer.setAttribute(this.object, 'y', (this.y + this.strokeWidth.value / 2).toString());

      if (width < 0) {
        renderer.setAttribute(this.object, 'x', (mouseX + this.strokeWidth.value / 2).toString());
        width = Math.abs(width) - 2 * this.strokeWidth.value;
      }
      if (height < 0) {
        renderer.setAttribute(this.object, 'y', (mouseY + this.strokeWidth.value / 2).toString());
        height = Math.abs(height) - 2 * this.strokeWidth.value;
      }

      if (this.isSquare) {
        if (mouseY < this.y && mouseX < this.x) {
          if (width < height) {
            height = width;
            renderer.setAttribute(this.object, 'y', (this.y - width).toString());
          } else {
            width = height;
            renderer.setAttribute(this.object, 'x', (this.x - height).toString());
          }
        } else if (width < height) {
          height = width;
          if (mouseY < this.y) {
            renderer.setAttribute(this.object, 'y', (this.x + this.y - mouseX).toString());
          }
        } else {
          width = height;
          if (mouseX < this.x) {
            renderer.setAttribute(this.object, 'x', (this.x + this.y - mouseY).toString());
          }
        }
      }

      renderer.setAttribute(this.object, 'width', (width).toString());
      renderer.setAttribute(this.object, 'height', (height).toString());
    }
  }

  /// Pour definir le style du rectangle (complet, contour, centre)
  private setStyle(renderer: Renderer2, isLeft: boolean = true) {
    switch (this.rectStyle.value) {
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
