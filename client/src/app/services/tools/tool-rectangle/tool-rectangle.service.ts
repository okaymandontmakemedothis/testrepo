import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { DrawingService } from '../../drawing/drawing.service';
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

  private object: SVGRectElement | null;

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
    private drawingService: DrawingService,
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
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {

      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.x = offset.x;
      this.y = offset.y;
      this.oldX = offset.x;
      this.oldY = offset.y;

      this.object = this.drawingService.renderer.createElement('rect', 'svg');
      this.drawingService.renderer.setAttribute(this.object, 'x', this.x.toString());
      this.drawingService.renderer.setAttribute(this.object, 'y', this.y.toString());

      this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
     // this.drawingService.renderer.setStyle(this.object, 'stroke-alignment', 'outer');

      if (event.button === 0) {
        this.setStyle();
      } else {
        this.setStyle(false);
      }
    }
  }

  /// Quand le bouton de la sourie est relaché, l'objet courrant de l'outil est mis a null.
  onRelease(event: MouseEvent): void {
    this.object = null;
    this.isSquare = false;
  }

  /// Quand le bouton de la sourie est apuyé et on bouge celle-ci, l'objet courrant subit des modifications.
  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (this.object) {
      this.setSize(offset.x, offset.y);
      this.drawingService.addObject(this.object);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.shiftKey && this.object) {
      this.isSquare = true;
      this.setSize(this.oldX, this.oldY);
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (!event.shiftKey && this.object) {
      this.isSquare = false;
      this.setSize(this.oldX, this.oldY);
    }
  }

  /// Transforme le size de l'objet courrant avec un x et un y en entrée
  private setSize(mouseX: number, mouseY: number): void {
    this.oldX = mouseX;
    this.oldY = mouseY;

    let width = mouseX - this.x - this.strokeWidth.value;
    let height = mouseY - this.y - this.strokeWidth.value;

    this.drawingService.renderer.setAttribute(this.object, 'x', (this.x + this.strokeWidth.value / 2).toString());
    this.drawingService.renderer.setAttribute(this.object, 'y', (this.y + this.strokeWidth.value / 2).toString());

    if (width < 0) {
      this.drawingService.renderer.setAttribute(this.object, 'x', (mouseX + this.strokeWidth.value / 2).toString());
      width = Math.abs(width) - 2 * this.strokeWidth.value;
    }
    if (height < 0) {
      this.drawingService.renderer.setAttribute(this.object, 'y', (mouseY + this.strokeWidth.value / 2).toString());
      height = Math.abs(height) - 2 * this.strokeWidth.value;
    }

    if (this.isSquare) {
      if (mouseY < this.y && mouseX < this.x) {
        if (width < height) {
          height = width;
          this.drawingService.renderer.setAttribute(this.object, 'y', (this.y - width - this.strokeWidth.value / 2).toString());
        } else {
          width = height;
          this.drawingService.renderer.setAttribute(this.object, 'x', (this.x - height - this.strokeWidth.value / 2).toString());
        }
      } else if (width < height) {
        height = width;
        if (mouseY < this.y) {
          this.drawingService.renderer.setAttribute(this.object, 'y', (this.x + this.y - mouseX + this.strokeWidth.value / 2).toString());
        }
      } else {
        width = height;
        if (mouseX < this.x) {
          this.drawingService.renderer.setAttribute(this.object, 'x', (this.x + this.y - mouseY + this.strokeWidth.value / 2).toString());
        }
      }
    }

    if (width < 0) {
      width = 0;
    }
    if (height < 0) {
      height = 0;
    }

    this.drawingService.renderer.setAttribute(this.object, 'height', (height).toString());
    this.drawingService.renderer.setAttribute(this.object, 'width', (width).toString());
  }

  /// Pour definir le style du rectangle (complet, contour, centre)
  private setStyle(isLeft: boolean = true) {
    switch (this.rectStyle.value) {
      case 'center': {
        if (isLeft) {
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},${this.colorTool.primaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.primaryAlpha}`);
        } else {
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.secondaryAlpha}`);
        }
        return;
      }
      case 'border': {
        this.drawingService.renderer.setStyle(this.object, 'fill', `none`);
        if (isLeft) {
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);
        } else {
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},${this.colorTool.primaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.primaryAlpha}`);
        }
        return;
      }
      case 'fill': {
        if (isLeft) {
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},${this.colorTool.primaryColor.b})`);
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},${this.colorTool.secondaryColor.b})`);

          this.drawingService.renderer.setStyle(this.object, 'fillOpacity', `${this.colorTool.primaryAlpha}`);
          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);
        } else {
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},${this.colorTool.primaryColor.b})`);
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},${this.colorTool.secondaryColor.b})`);

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
