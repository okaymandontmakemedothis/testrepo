import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_WIDTH } from '../tools-constants';
import { DrawingService } from '../../drawing/drawing.service';

/// Service de l'outil pencil, permet de créer des polyline en svg
/// Il est possible d'ajuster le stroke width dans le form
@Injectable({
  providedIn: 'root',
})
export class PencilToolService implements ITools {
  readonly toolName = 'Outil Crayon';
  readonly faIcon: IconDefinition = faPencilAlt;
  readonly id = ToolIdConstants.PENCIL_ID;
  private object: ElementRef | null;
  private dotId: number;
  private strokeWidth: FormControl;
  private lastPoint: Point;
  pointsList: Point[] = [];
  parameters: FormGroup;

  constructor(private offsetManager: OffsetManagerService, private colorTool: ToolsColorService, private drawingService: DrawingService) {
    this.strokeWidth = new FormControl(INITIAL_WIDTH);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
    });
  }

  /// Ajout d'un point dans la liste de point du Polyline
  private addPoint(point: Point) {
    if (this.object) {
      this.pointsList.push(point);
    }
  }

  /// Création d'un polyline selon la position de l'evenement de souris, choisi les bonnes couleurs selon le clique de souris
  onPressed(event: MouseEvent, renderer: Renderer2): ElementRef | null {
    if (event.button === 0 || event.button === 2) {
      if (this.strokeWidth.value && this.strokeWidth.value > 0) {
        const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
        this.lastPoint = { x: offset.x, y: offset.y };
        const point: ElementRef = this.drawingService.renderer.createElement('ellipse', 'svg');
        this.drawingService.renderer.setAttribute(point, 'cx', offset.x.toString());
        this.drawingService.renderer.setAttribute(point, 'cy', offset.y.toString());
        this.drawingService.renderer.setAttribute(point, 'ry', this.strokeWidth.value.toString());
        this.drawingService.renderer.setAttribute(point, 'rx', this.strokeWidth.value.toString());
        this.drawingService.renderer.setStyle(point, 'stroke', `none`);
        this.dotId = this.drawingService.addObject(point as ElementRef);

        this.object = this.drawingService.renderer.createElement('polyline', 'svg');

        this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
        this.drawingService.renderer.setAttribute(this.object, 'points', `${this.lastPoint.x} ${this.lastPoint.y}`);
        this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `round`);
        this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `round`);
        this.drawingService.renderer.setStyle(this.object, 'fill', `none`);
        if (event.button === 0) {
          this.drawingService.renderer.setStyle(
            this.object, 'stroke', `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          ${this.colorTool.primaryColor.b},${this.colorTool.primaryAlpha})`);

          this.drawingService.renderer.setStyle(
            point, 'fill', `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
        ${this.colorTool.primaryColor.b},${this.colorTool.primaryAlpha})`);

        } else {
          this.drawingService.renderer.setStyle(
            this.object, 'stroke', `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b},${this.colorTool.secondaryAlpha})`);

          this.drawingService.renderer.setStyle(
            point, 'fill', `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
            ${this.colorTool.secondaryColor.b},${this.colorTool.secondaryAlpha})`);
        }
      }
    }
    return null;
  }

  /// Réinitialisation de l'outil après avoir laisser le clique de la souris
  onRelease(event: MouseEvent, renderer: Renderer2): void {
    this.object = null;
    this.pointsList = [];
    this.lastPoint = { x: 0, y: 0 };
  }

  /// Ajout d'un point seulon le déplacement de la souris
  onMove(event: MouseEvent, renderer: Renderer2): void {
    this.addPoint(this.offsetManager.offsetFromMouseEvent(event));
    let pointString = '';
    for (const point of this.pointsList) {
      pointString += `${point.x} ${point.y},`;
    }
    pointString = pointString.substring(0, pointString.length - 1);
    this.drawingService.renderer.setAttribute(this.object, 'points', pointString);
    if (this.dotId !== -1) {
      this.drawingService.removeObject(this.dotId);
      this.drawingService.addObject(this.object as ElementRef);
      this.dotId = -1;
    }
  }
  onKeyUp(event: KeyboardEvent, renderer: Renderer2) {
    return null;
  }
  onKeyDown(event: KeyboardEvent, renderer: Renderer2) {
    return null;
  }

}
