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
  onKeyDown(event: KeyboardEvent): void {}

  /// Effectively this tool does not need this
  // tslint:disable-next-line: no-empty
  onKeyUp(event: KeyboardEvent): void {}

  private setSize(mouseX: number, mouseY: number): void {
    if (this.object) {

      console.log(this.firstX, this.firstY);

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

      console.log(this.x, this.y);

      this.center = {x: 0, y: 0};
      const contourOffset: Point = {x: 0, y: 0};
      if ( this.x >= this.firstX && this.y >= this.firstY ) {
        this.center.x = this.firstX + size / 2 + strokeWidth;
        this.center.y = this.firstY + size / 2 + strokeWidth;
        contourOffset.x = - Math.abs(this.firstX - this.x);
        contourOffset.y = - Math.abs(this.firstY - this.y);
      } else if ( this.x >= this.firstX && this.y < this.firstY ) {
        this.center.x = this.firstX + size / 2 + strokeWidth;
        this.center.y = this.firstY - size / 2 - strokeWidth;
      } else if ( this.x < this.firstX && this.y >= this.firstY ) {
        this.center.x = this.firstX - size / 2 - strokeWidth;
        this.center.y = this.firstY + size / 2 + strokeWidth;
      } else {
        this.center.x = this.firstX - size / 2 - strokeWidth;
        this.center.y = this.firstY - size / 2 - strokeWidth;
      }

      if (size <= 0) {
        return;
      }

      this.drawingService.renderer.setAttribute(this.contour, 'x', (this.x + contourOffset.x).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'y', (this.y + contourOffset.y).toString());

      this.drawingService.renderer.setAttribute(this.contour, 'width', (size + strokeWidth * 2).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'height', (size + strokeWidth * 2).toString());

      this.getPoints(size, this.center);

      this.drawingService.renderer.setAttribute(this.object, 'points', this.getPointsString());

      const polygonDimensions = this.getDimensions();
      let ratio: number = Math.min(size / polygonDimensions.x, size / polygonDimensions.y);
      ratio = (ratio < 1 ? 1 : ratio);
      const initialOffset = this.findSmallestDeltasBetween(this.points, {x: this.firstX, y: this.firstY});
      const totalOffsetX = -(polygonDimensions.x * (ratio - 1) * this.firstX / size) + initialOffset.x
      - (Math.sign(contourOffset.x) * strokeWidth);
      const totalOffsetY = -(polygonDimensions.y * (ratio - 1) * this.firstY / size) + initialOffset.y
      - (Math.sign(contourOffset.y) * strokeWidth);

      this.drawingService.renderer.setAttribute(this.object, 'transform',
      'scale(' + ratio + ',' + ratio + ') translate (' + totalOffsetX + ',' + totalOffsetY + ')' );
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

  private getDimensions(): Point {
    let highest = -Infinity;
    let lowest = Infinity;
    let leftmost = Infinity;
    let rightmost = -Infinity;
    for ( const point of this.points ) {
      if ( point.x < leftmost ) {
        leftmost = point.x;
      }
      if ( point.x > rightmost ) {
        rightmost = point.x;
      }
      if ( point.y > highest ) {
        highest = point.y;
      }
      if ( point.y < lowest ) {
        lowest = point.y;
      }
    }
    return {x: (rightmost - leftmost), y: (highest - lowest)};
  }

  private findSmallestDeltasBetween(compared: {x: number, y: number}[], comparand: Point): Point {
    let smallestXDelta = Infinity;
    let smallestYDelta = Infinity;
    let isXNegative = false;
    let isYNegative = false;

    for ( const point of compared) {
      /// Calculate the deltas
      const tempXDelta = Math.abs(comparand.x - point.x);
      if ( tempXDelta < smallestXDelta ) {
        smallestXDelta = tempXDelta;
        /// Determine the signs
        if ( point.x > comparand.x ) {
          isXNegative = true;
        } else {
          isXNegative = false;
        }
      }
      const tempYDelta = Math.abs(comparand.y - point.y);
      if ( tempYDelta < smallestYDelta ) {
        smallestYDelta = tempYDelta;
        /// Determine the signs
        if ( point.y > comparand.y ) {
          isYNegative = true;
        } else {
          isYNegative = false;
        }
      }
    }
    if (isXNegative) {
      smallestXDelta = -smallestXDelta;
    }
    if (isYNegative) {
      smallestYDelta = -smallestYDelta;
    }
    return { x: smallestXDelta, y: smallestYDelta };
  }

  private getPoints(size: number, center: Point) {
    /// reset array from previous values
    this.points = [];

    if ( size === 0 ) {
      return;
    }
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
    for (let i = 1; i < this.vertexNumber.value; i++ ) {
      angleToAdd += angle;
      this.getPointsXandY(radius, angleToAdd, center);
    }
  }

  private getPointsXandY(radius: number, angleToAdd: number, center: Point) {
    const strokeWidth = this.strokeWidth.value;
    const y = center.y + (radius - strokeWidth) * Math.sin(this.getRAD((this.initialAngle + angleToAdd) % 360));
    const x = center.x + (radius - strokeWidth) * Math.cos(this.getRAD((this.initialAngle + angleToAdd) % 360));
    this.points.push({x, y});
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
