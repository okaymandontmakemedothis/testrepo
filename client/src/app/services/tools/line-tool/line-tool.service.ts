import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faGripLines, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { DrawingService } from '../../drawing/drawing.service';
import { KeyCodes } from '../../hotkeys/hotkeys-constants';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_WIDTH } from '../tools-constants';

/// Service de l'outil pencil, permet de créer des polyline en svg
/// Il est possible d'ajuster le stroke width dans le form
@Injectable({
  providedIn: 'root',
})
export class LineToolService implements ITools {
  readonly toolName = 'Outil Ligne';
  readonly faIcon: IconDefinition = faGripLines;
  readonly id = ToolIdConstants.LINE_ID;

  private object: SVGPolylineElement | null;

  private strokeWidth: FormControl;

  private pointsList: Point[] = [];
  private firstPoint: Point;
  private newPoint: Point;

  private markerId = 0;
  private circle: SVGCircleElement | null;

  parameters: FormGroup;
  // private begin: boolean;
  private clickNumber: number;
  private diameter: FormControl;
  private isShiftPressed: boolean;
  private rectStyleMotif: FormControl;
  private rectStyleJonction: FormControl;

  constructor(
    private offsetManager: OffsetManagerService, 
    private colorTool: ToolsColorService, 
    private drawingService: DrawingService,
    ) {
    this.clickNumber = 0;
    this.strokeWidth = new FormControl(INITIAL_WIDTH);
    this.diameter = new FormControl(3 * INITIAL_WIDTH);
    this.rectStyleMotif = new FormControl('ligne');
    this.rectStyleJonction = new FormControl('arrondi');
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      diameter: this.diameter,
      rectStyleMotif: this.rectStyleMotif,
      rectStyleJonction: this.rectStyleJonction,
    });
    this.object = null;
    this.isShiftPressed = false;
  }

  private defineMarker(id: number): void {
    const markerDefs: SVGDefsElement = this.drawingService.renderer.createElement('defs', 'svg');
    const marker = this.drawingService.renderer.createElement('marker', 'svg');

    this.drawingService.renderer.setAttribute(marker, 'markerUnits', 'userSpaceOnUse');
    this.drawingService.renderer.setAttribute(marker, 'markerHeight', (this.diameter.value).toString());
    this.drawingService.renderer.setAttribute(marker, 'markerWidth', (this.diameter.value).toString());

    this.drawingService.renderer.setProperty(marker, 'id', `Marker${id.toString()}`);
    this.drawingService.renderer.setAttribute(marker, 'viewBox',
      `0 0 ${this.diameter.value} ${this.diameter.value}`);
    this.drawingService.renderer.setAttribute(marker, 'refX', (this.diameter.value / 2).toString());
    this.drawingService.renderer.setAttribute(marker, 'refY', (this.diameter.value / 2).toString());

    this.circle = this.drawingService.renderer.createElement('circle', 'svg');
    this.drawingService.renderer.setAttribute(this.circle, 'cx', (this.diameter.value / 2).toString());
    this.drawingService.renderer.setAttribute(this.circle, 'cy', (this.diameter.value / 2).toString());
    this.drawingService.renderer.setAttribute(this.circle, 'r', (this.diameter.value / 2).toString());
    this.drawingService.renderer.setAttribute(this.circle, 'visibility', 'hidden');

    this.drawingService.renderer.appendChild(markerDefs, marker);

    this.drawingService.renderer.appendChild(marker, this.circle);

    this.drawingService.addObject(markerDefs);
  }

  /// Création d'un polyline selon la position de l'evenement de souris, choisi les bonnes couleurs selon le clique de souris
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      if (this.verifydoubleClick() === true) {
        this.onDoublePressed();
        return;
      }

      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      if (!this.object) {
        if (this.strokeWidth.value > 0) {
          this.firstPoint = { x: offset.x, y: offset.y };
          this.newPoint = this.firstPoint;
          this.defineMarker(this.markerId);
          this.object = this.drawingService.renderer.createElement('polyline', 'svg');
          this.drawingService.renderer.setAttribute(this.object, 'name', 'line');
          this.drawingService.renderer.setAttribute(this.object, 'marker-start', `url(#Marker${this.markerId})`);
          this.drawingService.renderer.setAttribute(this.object, 'marker-mid', `url(#Marker${this.markerId})`);
          this.drawingService.renderer.setAttribute(this.object, 'marker-end', `url(#Marker${this.markerId})`);
          this.markerId++;
          this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
          this.drawingService.renderer.setAttribute(this.object, 'points', `${this.firstPoint.x} ${this.firstPoint.y}`);

          // style motif
          this.selectStyleJonction();
          // style jonction
          this.selectStyleMotif();

          this.drawingService.renderer.setStyle(this.object, 'fill', `none`);
          if (event.button === 0) {
            this.drawingService.renderer.setStyle(
              this.object, 'stroke', `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
              ${this.colorTool.primaryColor.b})`);
            this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.primaryAlpha}`);

            this.drawingService.renderer.setStyle(
              this.circle, 'fill', `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
              ${this.colorTool.primaryColor.b})`);
            this.drawingService.renderer.setStyle(this.circle, 'fillOpacity', `${this.colorTool.primaryAlpha}`);

          } else {
            this.drawingService.renderer.setStyle(
              this.object, 'stroke', `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
                ${this.colorTool.secondaryColor.b})`);
            this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);

            this.drawingService.renderer.setStyle(
              this.circle, 'fill', `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
                  ${this.colorTool.secondaryColor.b})`);
            this.drawingService.renderer.setStyle(this.circle, 'fillOpacity', `${this.colorTool.secondaryAlpha}`);
          }
          this.drawingService.addObject(this.object as SVGPolylineElement);
          this.addPoint(this.newPoint);
        }
      }
      this.addPoint(this.newPoint);
    }

  }

  /// Réinitialisation de l'outil après avoir laisser le clique de la souris
  // tslint:disable-next-line: no-empty
  onRelease(event: MouseEvent): void { }

  /// Ajout d'un point seulon le déplacement de la souris
  onMove(event: MouseEvent): void {
    if (this.object) {
      this.newPoint = this.offsetManager.offsetFromMouseEvent(event);
      this.changePoint(this.newPoint);

      this.updatelistPoint();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (!event.shiftKey) {
      this.isShiftPressed = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.object) {
      if (event.code === KeyCodes.backSpace) {
        this.removeRecentPoint();
      } else if (event.code === KeyCodes.esc) {
        this.eraseLine();
      } else if (event.shiftKey) {
        this.isShiftPressed = true;
      }
    }
  }

  /// Ajout d'un point dans la liste de point du Polyline
  private addPoint(point: Point): void {
    if (this.object) {
      this.pointsList.push(point);
    }
  }

  private changePoint(point: Point): void {
    if (this.object) {
      this.pointsList.pop();
      this.pointsList.push(point);
    }
  }

  /// mettre a jour la liste de points reliant les segments
  private updatelistPoint(): void {
    let pointString = '';
    for (const point of this.pointsList) {
      pointString += `${point.x} ${point.y},`;
    }
    pointString = pointString.substring(0, pointString.length - 1);
    this.drawingService.renderer.setAttribute(this.object, 'points', pointString);
  }

  private verifydoubleClick(): boolean {
    /// si le nombre d'evenement est egale a  2 alors la fonction onDoublePressed peut etre appele
    this.clickNumber++;
    /// verification apres un delai
    if (this.clickNumber === 1) {
      /// ares 1/2 seconde on remet le nombre d'evement a zero
      setTimeout(() => { this.clickNumber = 0; },
        200);
    }
    if (this.clickNumber >= 2) {
      this.clickNumber = 0;
      return true;
    }
    return false;
  }

  private onDoublePressed(): void {
    if (this.object) {
      this.pointsList.pop();
      this.updatelistPoint();
      if (this.isShiftPressed === true) {
        this.setLineLoop();
      }
      this.object = null;
      this.circle = null;
      this.pointsList = [];
    }
  }

  private setLineLoop(): void {
    if (this.firstPoint) {
      this.addPoint(this.firstPoint);
      this.updatelistPoint();
    }
  }

  /// mettre a jour la liste de points contenant les lignes
  private removeRecentPoint(): void {
    if (this.pointsList.length > 2) {
      const obj = this.pointsList.pop();
      this.pointsList.pop();
      this.pointsList.push(obj as Point);
    }
    this.updatelistPoint();
  }

  private eraseLine(): void {
    /// mettre a jour la liste de points contenant les segments
    this.pointsList.splice(0);
    this.updatelistPoint();
   /* if (this.object) {
      this.object = null;
    }*/
  }

 
  changeTool(): void {
    this.onDoublePressed();
  }

  selectStyleJonction(): void {
    if (this.circle) {
      this.drawingService.renderer.setAttribute(this.circle, 'visibility', 'hidden');
      if (this.rectStyleJonction.value === 'arrondi') {
        this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `round`);
        this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `round`);
      } else if (this.rectStyleJonction.value === 'en angle') {
        this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `square`);
        this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `miter`);
      } else if (this.rectStyleJonction.value === 'avec point') {
        this.drawingService.renderer.setAttribute(this.circle, 'visibility', 'visible');
      }
    }
  }

  selectStyleMotif(): void {
    if (this.object) {
      if (this.rectStyleMotif.value === 'pointille-trait') {
        this.drawingService.renderer.setStyle(this.object, 'stroke-dasharray', `${this.strokeWidth.value * 2}`);
      } else if (this.rectStyleMotif.value === 'pointille-point') {
        this.drawingService.renderer.setStyle(this.object, 'stroke-dasharray', `1 ${this.strokeWidth.value * 1.5}`);
      } else {
        this.drawingService.renderer.setStyle(this.object, 'stroke-dasharray', ``);
      }
    }
  }
}
