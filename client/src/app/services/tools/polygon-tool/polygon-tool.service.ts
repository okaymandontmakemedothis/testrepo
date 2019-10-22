import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faDrawPolygon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class PolygonToolService implements ITools {
  readonly faIcon: IconDefinition = faDrawPolygon;
  readonly toolName = 'Outil Polygon';
  readonly id = ToolIdConstants.POLYGONE_ID;

  private object: SVGPolygonElement | null;
  private contour: SVGRectElement | null;
  private contourId: number;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private polygonStyle: FormControl;
  private vertexNumber: FormControl;
  private points: Point[];
  private initialAngle: number;

  private x: number;
  private y: number;
  private firstX: number;
  private firstY: number;
  private center: Point;

  constructor(
    private offsetManager: OffsetManagerService,
    private colorTool: ToolsColorService,
    private drawingService: DrawingService,
  ) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.polygonStyle = new FormControl('fill');
    this.vertexNumber = new FormControl(3, Validators.min(3));
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      polygonStyle: this.polygonStyle,
      vertexNumber: this.vertexNumber,
    });
  }

  /// Quand le bouton de la souris est enfoncé, on crée un polygone regulier et convex.
  /// On le retourne en sortie et il est inséré dans l'objet courant de l'outil.
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      this.contour = this.drawingService.renderer.createElement('rect', 'svg');
      this.drawingService.renderer.setStyle(this.contour, 'stroke', `rgba(0, 0, 0, 1)`);
      this.drawingService.renderer.setStyle(this.contour, 'stroke-width', `1`);
      this.drawingService.renderer.setStyle(this.contour, 'stroke-dasharray', `10,10`);
      this.drawingService.renderer.setStyle(this.contour, 'd', `M5 40 l215 0`);
      this.drawingService.renderer.setStyle(this.contour, 'fill', `none`);
      if (this.contour) {
        this.contourId = this.drawingService.addObject(this.contour);
      }

      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.x = offset.x;
      this.y = offset.y;
      this.firstX = offset.x;
      this.firstY = offset.y;

      this.object = this.drawingService.renderer.createElement('polygon', 'svg');
      this.drawingService.renderer.setAttribute(this.object, 'name', 'polygon');

      this.drawingService.renderer.setStyle(this.object, 'stroke-width', this.strokeWidth.value.toString());
      this.drawingService.renderer.setStyle(this.object, 'stroke-alignment', 'outer');

      if (event.button === 0) {
        this.setStyle();
      } else {
        this.setStyle(false);
      }

      if (this.object) {
        this.drawingService.addObject(this.object);
      }
    }
  }

  /// Quand le bouton de la sourie est relaché, il n'existe plus d'objet courrant de l'outil.
  onRelease(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      this.object = null;
      if (this.contour) {
        this.drawingService.removeObject(this.contourId);
        this.contourId = 0;
      }
    }
  }

  /// Transforme le size de l'objet courant avec un x et un y en entrée
  onMove(event: MouseEvent): void {
    if (this.object) {
      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.setSize(offset.x, offset.y);
    }
  }

  /// Effectively this tool does not need this
  // tslint:disable-next-line: no-empty
  onKeyDown(event: KeyboardEvent): void { }

  /// Effectively this tool does not need this
  // tslint:disable-next-line: no-empty
  onKeyUp(event: KeyboardEvent): void { }

  private setSize(mouseX: number, mouseY: number): void {
    if (this.object) {

      let size: number;
      const strokeWidth: number = this.strokeWidth.value;
      const width = mouseX - this.firstX - (strokeWidth * 2);
      const height = mouseY - this.firstY - (strokeWidth * 2);

      if (Math.abs(width) < Math.abs(height)) {
        size = Math.abs(width);
      } else {
        size = Math.abs(height);
      }

      if (width >= 0) {
        this.x = this.firstX;
        if (height > 0) {
          this.y = this.firstY;
        } else {
          this.y = this.firstY - size - strokeWidth * 2;
        }
      } else {
        this.x = this.firstX - size - strokeWidth * 2;
        if (height >= 0) {
          this.y = this.firstY;
        } else {
          this.y = this.firstY - size - strokeWidth * 2;
        }
      }

      this.center = { x: this.x + size / 2, y: this.y + size / 2 };

      if (size <= 0) {
        return;
      }

      this.drawingService.renderer.setAttribute(this.contour, 'x', (this.x).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'y', (this.y).toString());

      this.drawingService.renderer.setAttribute(this.contour, 'width', (size + strokeWidth * 2).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'height', (size + strokeWidth * 2).toString());

      this.getPoints(size, this.center);

      this.drawingService.renderer.setAttribute(this.object, 'points', this.getPointsString());

      const polyRect = this.object.getBoundingClientRect();
      const rectRect = (this.contour as SVGRectElement).getBoundingClientRect();

      const polyCenter: Point = { x: polyRect.left + polyRect.width / 2, y: polyRect.top + polyRect.height / 2 };
      const rectCenter: Point = { x: rectRect.left + rectRect.width / 2, y: rectRect.top + rectRect.height / 2 };

      const difY = rectCenter.y - polyCenter.y;

      this.points.forEach((pt) => {
        pt.y += difY;
      });

      this.drawingService.renderer.setAttribute(this.object, 'points', this.getPointsString());
    }
  }

  private setStyle(isLeft: boolean = true) {
    switch (this.polygonStyle.value) {
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
            `rgba(${this.colorTool.primaryColor.r},${this.colorTool.primaryColor.g},${this.colorTool.primaryColor.b})`);
          this.drawingService.renderer.setStyle(this.object, 'fill',
            `rgba(${this.colorTool.secondaryColor.r},${this.colorTool.secondaryColor.g},${this.colorTool.secondaryColor.b})`);

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

  private getPoints(size: number, center: Point) {
    /// reset array from previous values
    this.points = [];

    /// determine circle angles
    const angle = 360 / this.vertexNumber.value;
    /// set initial angle if square
    if (this.vertexNumber.value === 4) {
      this.initialAngle = 315;
    } else {
      this.initialAngle = 270;
    }
    /// determine radius
    const radius = size / 2;
    /// determine x and y from origin and initial angle
    this.getPointsXandY(radius, 0, center);
    /// repeat last step but add angle as you go for the n-1 remaining sides/points
    let angleToAdd = 0;
    for (let i = 1; i < this.vertexNumber.value; i++) {
      angleToAdd += angle;
      this.getPointsXandY(radius, angleToAdd, center);
    }
  }

  private getPointsXandY(radius: number, angleToAdd: number, center: Point) {
    const strokeWidth = this.strokeWidth.value;
    const y = center.y + (radius - strokeWidth) * Math.sin(this.getRAD((this.initialAngle + angleToAdd) % 360));
    const x = center.x + (radius - strokeWidth) * Math.cos(this.getRAD((this.initialAngle + angleToAdd) % 360));
    this.points.push({ x, y });
  }

  private getRAD(angle: number) {
    return angle * Math.PI / 180;
  }

  private getPointsString() {
    let tempString = '';
    for (const point of this.points) {
      tempString += point.x + ',' + point.y + ' ';
    }
    return tempString;
  }
}
