import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_WIDTH } from '../tools-constants';
import { RGB } from 'src/app/model/rgb.model';

/// Service de l'outil pencil, permet de créer des polyline en svg
/// Il est possible d'ajuster le stroke width dans le form
@Injectable({
  providedIn: 'root',
})
export class PencilToolService implements ITools {
  readonly toolName = 'Outil Crayon';
  readonly faIcon: IconDefinition = faPencilAlt;
  readonly id = ToolIdConstants.PENCIL_ID;
  private object: SVGPolylineElement | null;
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
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      if (this.strokeWidth.value && this.strokeWidth.value > 0) {
        const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
        this.lastPoint = { x: offset.x, y: offset.y };
        const point: SVGEllipseElement = this.drawingService.renderer.createElement('ellipse', 'svg');
        this.drawingService.renderer.setAttribute(point, 'cx', offset.x.toString());
        this.drawingService.renderer.setAttribute(point, 'cy', offset.y.toString());
        this.drawingService.renderer.setAttribute(point, 'ry', (this.strokeWidth.value / 2).toString());
        this.drawingService.renderer.setAttribute(point, 'rx', (this.strokeWidth.value / 2).toString());
        this.drawingService.renderer.setStyle(point, 'stroke', `none`);
        this.dotId = this.drawingService.addObject(point);

        this.object = this.drawingService.renderer.createElement('polyline', 'svg');

        this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
        this.drawingService.renderer.setAttribute(this.object, 'points', `${this.lastPoint.x} ${this.lastPoint.y}`);
        this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `round`);
        this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `round`);
        this.drawingService.renderer.setStyle(this.object, 'fill', `none`);

        if (event.button === 0) {
          this.setColors(this.colorTool.primaryColor, this.colorTool.primaryAlpha, point);
          // this.drawingService.renderer.setStyle(
          //   this.object, 'stroke', `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          // ${this.colorTool.primaryColor.b})`);
          // this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.primaryAlpha}`);

          // this.drawingService.renderer.setStyle(
          //   point, 'fill', `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
          // ${this.colorTool.primaryColor.b})`);
          // this.drawingService.renderer.setStyle(point, 'fillOpacity', `${this.colorTool.primaryAlpha}`);

        } else {
          this.setColors(this.colorTool.secondaryColor, this.colorTool.secondaryAlpha, point);
          // this.drawingService.renderer.setStyle(
          //   this.object, 'stroke', `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
          //   ${this.colorTool.secondaryColor.b})`);
          // this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);

          // this.drawingService.renderer.setStyle(
          //   point, 'fill', `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
          //     ${this.colorTool.secondaryColor.b})`);
          // this.drawingService.renderer.setStyle(point, 'fillOpacity', `${this.colorTool.secondaryAlpha}`);
        }
      }
    }
  }
  setColors(rgb: RGB, a: number, dot: SVGElement) {
    this.drawingService.renderer.setStyle(
      this.object, 'stroke', `rgb(${ rgb.r }, ${ rgb.g },
        ${ rgb.b })`);
    this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', a.toString());
    this.drawingService.renderer.setStyle(
      dot, 'fill', `rgb(${rgb.r}, ${rgb.g},
        ${ rgb.b})`);
    this.drawingService.renderer.setStyle(dot, 'fillOpacity', a.toString());
  }


  /// Réinitialisation de l'outil après avoir laisser le clique de la souris
  onRelease(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      this.object = null;
      this.pointsList = [];
      this.lastPoint = { x: 0, y: 0 };
    }
  }

  /// Ajout d'un point seulon le déplacement de la souris
  onMove(event: MouseEvent): void {
    if (this.object) {
      this.addPoint(this.offsetManager.offsetFromMouseEvent(event));
      let pointString = '';
      for (const point of this.pointsList) {
        pointString += `${point.x} ${point.y},`;
      }
      pointString = pointString.substring(0, pointString.length - 1);
      this.drawingService.renderer.setAttribute(this.object, 'points', pointString);
      if (this.dotId !== -1) {
        this.drawingService.removeObject(this.dotId);
        this.drawingService.addObject(this.object);
        this.dotId = -1;
      }
    }
  }
  onKeyUp(event: KeyboardEvent) {
    return;
  }
  onKeyDown(event: KeyboardEvent) {
    return;
  }

}
