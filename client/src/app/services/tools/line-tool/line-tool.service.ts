import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPencilAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  readonly faIcon: IconDefinition = faPencilAlt;
  readonly id = ToolIdConstants.LINE_ID;
  private object: SVGPolylineElement | null;
  private dotId: number;
  private dotIdjonction: number;
  private dotIdlistjonction: number[] = [];
  private listjonction: SVGEllipseElement[] = [];
  private strokeWidth: FormControl;

  private newPoint: Point;
  private firstPoint: Point;
  private pointsList: Point[] = [];

  parameters: FormGroup;
  // private begin: boolean;
  private clickNumber: number;
  private diameter: FormControl;
  private isShiftPressed: boolean;
  private rectStyleMotif: FormControl;
  private rectStyleJonction: FormControl;

  constructor(private offsetManager: OffsetManagerService, private colorTool: ToolsColorService, private drawingService: DrawingService) {
    // this.begin = false;
    this.clickNumber = 0;
    this.strokeWidth = new FormControl(INITIAL_WIDTH);
    this.diameter = new FormControl(INITIAL_WIDTH);
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

          this.addJonctionPoint(offset);
          const point: SVGEllipseElement = this.drawingService.renderer.createElement('ellipse', 'svg');
          this.drawingService.renderer.setAttribute(point, 'cx', this.firstPoint.x.toString());
          this.drawingService.renderer.setAttribute(point, 'cy', this.firstPoint.y.toString());
          this.drawingService.renderer.setAttribute(point, 'ry', (this.strokeWidth.value / 2).toString());
          this.drawingService.renderer.setAttribute(point, 'rx', (this.strokeWidth.value / 2).toString());

          this.dotId = this.drawingService.addObject(point);
          this.object = this.drawingService.renderer.createElement('polyline', 'svg');

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
              point, 'fill', `rgb(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},
              ${this.colorTool.primaryColor.b})`);
            this.drawingService.renderer.setStyle(point, 'fillOpacity', `${this.colorTool.primaryAlpha}`);

          } else {
            this.drawingService.renderer.setStyle(
              this.object, 'stroke', `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
                ${this.colorTool.secondaryColor.b})`);
            this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.colorTool.secondaryAlpha}`);

            this.drawingService.renderer.setStyle(
              point, 'fill', `rgb(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},
                  ${this.colorTool.secondaryColor.b})`);
            this.drawingService.renderer.setStyle(point, 'fillOpacity', `${this.colorTool.secondaryAlpha}`);
          }

          this.addJonctionPoint(offset);
          this.addPoint(this.newPoint);
        }
      }
      this.addJonctionPoint(offset);
      this.addPoint(this.newPoint);
    }

  }

  /// Réinitialisation de l'outil après avoir laisser le clique de la souris
  // tslint:disable-next-line: no-empty
  onRelease(event: MouseEvent): void { }

  /// Ajout d'un point seulon le déplacement de la souris
  onMove(event: MouseEvent): void {
    if (this.object) {
      // this.begin = true;
      this.newPoint = this.offsetManager.offsetFromMouseEvent(event);
      this.changePoint(this.newPoint);

      this.updatelistPoint();
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (!event.shiftKey) {
      this.isShiftPressed = false;
    }
  }

  onKeyDown(event: KeyboardEvent) {
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
  private addPoint(point: Point) {
    if (this.object) {
      this.pointsList.push(point);
    }
  }

  private changePoint(point: Point) {
    if (this.object) {
      this.pointsList.pop();
      this.pointsList.push(point);
    }
  }

  private verifydoubleClick(): boolean {
    /// si le nombre d'evenement est egale a  2 alors la fonction onDoublePressed peut etre appele
    this.clickNumber++;
    /// verification apres un delai
    if (this.clickNumber === 1) {
      /// ares 1/2 seconde on remet le nombre d'evement a zero
      setTimeout(() => { this.clickNumber = 0; },
        300);
    }
    if (this.clickNumber === 2) {
      this.clickNumber = 0;
      return true;
    }
    return false;
  }

  private addJonctionPoint(offset: Point) {
    let diameter;

    const pointjonction: SVGEllipseElement = this.drawingService.renderer.createElement('ellipse', 'svg');
    this.drawingService.renderer.setAttribute(pointjonction, 'cx', offset.x.toString());
    this.drawingService.renderer.setAttribute(pointjonction, 'cy', offset.y.toString());
    if (this.rectStyleJonction.value === 'avec point') {
      diameter = this.diameter.value;
    } else {
      diameter = 0;
    }
    this.drawingService.renderer.setAttribute(pointjonction, 'ry', (diameter).toString());
    this.drawingService.renderer.setAttribute(pointjonction, 'rx', (diameter).toString());

    this.dotIdjonction = this.drawingService.addObject(pointjonction);

    this.dotIdlistjonction.push(this.dotIdjonction);

    this.listjonction.push(pointjonction);

  }

  private onDoublePressed() {
    if (this.object) {
      if (this.isShiftPressed === true) {
        this.setLineLoop();
      }
      this.object = null;
      this.pointsList = [];
      this.dotIdlistjonction = [];
      this.listjonction = [];
      // this.begin = false;
    }
  }

  private removeRecentPoint() {
    /// mettre a jour la liste de points contenant les lignes
    if (this.pointsList.length > 2) {
      const obj = this.pointsList.pop();
      this.pointsList.pop();
      this.pointsList.push(obj as Point);
    }
    this.updatelistPoint();
    /// mettre a jour la liste de points contenant les points de jonctions
    if (this.dotIdlistjonction.length > 1) {
      this.drawingService.removeObject((this.dotIdlistjonction[this.dotIdlistjonction.length - 1]));
      this.dotIdlistjonction.pop();
    }
  }

  private updatelistPoint() {
    /// mettre a jour la liste de points reliant les segments
    let pointString = '';
    for (const point of this.pointsList) {
      pointString += `${point.x} ${point.y},`;
    }
    pointString = pointString.substring(0, pointString.length - 1);
    this.drawingService.renderer.setAttribute(this.object, 'points', pointString);
    if (this.dotId !== -1 && this.object) {
      this.drawingService.removeObject(this.dotId);
      this.drawingService.addObject(this.object);
      this.dotId = -1;
    }
  }

  private updatelistJonctionPoint(value: number) {
    let compteur;
    for (compteur = 0; compteur < this.listjonction.length; compteur++) {
      this.drawingService.renderer.setAttribute(this.listjonction[compteur], 'ry', value.toString());
      this.drawingService.renderer.setAttribute(this.listjonction[compteur], 'rx', value.toString());
    }
  }

  private eraseLine() {
    /// mettre a jour la liste de points contenant les segments
    this.pointsList.splice(0);

    this.updatelistPoint();

    /// mettre a jour la liste de points contenant les points de jonction
    while (this.dotIdlistjonction.length > 0) {
      this.drawingService.removeObject((this.dotIdlistjonction[this.dotIdlistjonction.length - 1]));
      this.dotIdlistjonction.pop();
    }
    if (this.object) {
      this.object = null;
    }
  }

  private setLineLoop() {
    if (this.firstPoint) {
      this.addPoint(this.firstPoint);
      this.updatelistPoint();
    }
  }

  selectStyleJonction() {
    if (this.rectStyleJonction.value === 'arrondi') {
      this.updatelistJonctionPoint(0);
      this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `round`);
      this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `round`);
    } else if (this.rectStyleJonction.value === 'en angle') {
      this.updatelistJonctionPoint(0);
      this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `square`);
      this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `miter`);
    } else if (this.rectStyleJonction.value === 'avec point') {
      this.updatelistJonctionPoint(this.diameter.value);
      this.drawingService.renderer.setStyle(this.object, 'stroke-linecap', `round`);
      this.drawingService.renderer.setStyle(this.object, 'stroke-linejoin', `round`);
    }
  }

  selectStyleMotif() {
    if (this.rectStyleMotif.value === 'pointille-trait') {
      this.drawingService.renderer.setStyle(this.object, 'stroke-dasharray', `10 20`);
    } else if (this.rectStyleMotif.value === 'pointille-point') {
      this.drawingService.renderer.setStyle(this.object, 'stroke-dasharray', `1 10`);
    } else {
      this.drawingService.renderer.setStyle(this.object, 'stroke-dasharray', `1 1`);
    }
  }

  changeStrokeWidth() {
    this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
  }

  changeDiameter() {
    if (this.rectStyleJonction.value === 'avec point') {
      this.updatelistJonctionPoint(this.diameter.value);
    }
  }
}
