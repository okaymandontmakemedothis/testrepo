import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faDrawPolygon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { Point } from 'src/app/model/point.model';

@Injectable({
  providedIn: 'root',
})
export class PolygonToolService implements ITools {
  readonly faIcon: IconDefinition = faDrawPolygon;
  readonly toolName = 'Outil Polygon';
  readonly id = ToolIdConstants.POLYGONE_ID;

  private object: SVGPolygonElement | null;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private polygonStyle: FormControl;
  private vertexNumber: FormControl;
  private points: Point[];
  private initialAngle: number;

  private contour: SVGRectElement | null;
  private contourId: number;
  x: number;
  y: number;
  firstX: number;
  firstY: number;

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
      rectStyle: this.polygonStyle,
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

  private getPoints(size: number, mouseXY: Point) {
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
    this.getPointsXandY(radius, 0, size);
    /// repeat last step but add angle as you go for the n-1 remaining sides/points
    let angleToAdd = 0;
    for (let i = 1; i < this.vertexNumber.value; i++ ) {
      angleToAdd += angle;
      this.getPointsXandY(radius, angleToAdd, size);
    }
    /// adjust the points
    // this.adjustCoordinates(this.points, size, mouseXY);
  }

  private getPointsXandY(radius: number, angleToAdd: number, width: number) {
    const y = this.y + width / 2 + radius * Math.sin(this.getRAD((this.initialAngle + angleToAdd) % 360));
    const x = this.x + width / 2 + radius * Math.cos(this.getRAD((this.initialAngle + angleToAdd) % 360));
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

  private adjustCoordinates(points: Point[], size: number, mouseXY: Point) {
    /// Get center point
    const center: Point = {x: size / 2, y: size / 2};
    // const distanceCenterPoint: number[] = [];
    // const distanceCenterContour: number[] = [];
    let distanceCenterPoint: number;
    let distanceCenterContour: number;
    let ratio: number;
    let closestQuadrantSides: {X: Point, Y: Point};
    let closestPoint: Point;
    /// For each point
    for (const point of points) {
      /// Find in which quadrant the point belongs to
      closestQuadrantSides = this.findPointClosestQuadrantSides(point, center, mouseXY);

      /// Find the distance between the center point and the coordinates of the given point
      distanceCenterPoint = this.pythagore(point, center);
      // distanceCenterPoint.push(distance.valueOf());
      /// Find the closest distance between the point and either mouseY or mouseX
        /// Find the two intercepts with the 2 (mouseX and mouseY) slopes
      this.getPointInterceptFrom(center, point, closestQuadrantSides.X);
      this.getPointInterceptFrom(center, point, closestQuadrantSides.Y);
        /// Find the closest of the two points
      // console.log('closest point?');
      const mouseXDistance = this.pythagore(closestQuadrantSides.X, point);
      // console.log(mouseXDistance); console.log(closestQuadrantSides.X);
      const mouseYDistance = this.pythagore(closestQuadrantSides.Y, point);
      // console.log(mouseYDistance); console.log(closestQuadrantSides.Y);
      if (mouseXDistance < mouseYDistance) {
        closestPoint = closestQuadrantSides.X;
      } else { /// X > Y or X == Y
        closestPoint = closestQuadrantSides.Y;
      }
      // console.log(closestPoint);
      // console.log(mouseXY.x, mouseXY.y);
      /// Get distance from center to closest point/countour
      distanceCenterContour = this.pythagore(closestPoint, center);
      // distanceCenterContour.push(distance.valueOf());

      /// Get ratio
      ratio = distanceCenterContour / distanceCenterPoint;

      /// Apply ratio to the coordinates
      point.x *= ratio; point.y *= ratio;
    }
  }

  private findPointClosestQuadrantSides(point: Point, center: Point, SelectionCorner: Point): {X: Point, Y: Point} {
    const pointWithKnownX: Point = {x: NaN, y: NaN};
    const pointWithKnownY: Point = {x: NaN, y: NaN};
    if (point.x >= center.x && point.y >= center.y) {
      pointWithKnownX.x = SelectionCorner.x.valueOf();
      pointWithKnownY.y = SelectionCorner.y.valueOf();
    } else if (point.x >= center.x && point.y < center.y) {
      pointWithKnownX.x = SelectionCorner.x.valueOf();
      pointWithKnownY.y = this.firstY.valueOf();
    } else if (point.x < center.x && point.y >= center.y) {
      pointWithKnownX.x = this.firstX.valueOf();
      pointWithKnownY.y = SelectionCorner.y.valueOf();
    } else {// (point.x < center.x && point.y < center.y) {
      pointWithKnownX.x = this.firstX.valueOf();
      pointWithKnownY.y = this.firstY.valueOf();
    }
    console.log('start');
    console.log(point); console.log(center); console.log(SelectionCorner); console.log({X: pointWithKnownX, Y: pointWithKnownY});
    return {X: pointWithKnownX, Y: pointWithKnownY};
  }

  private pythagore(pointDestination: Point, pointOrigin: Point): number {
    return Math.sqrt(Math.pow((pointDestination.x - pointOrigin.x), 2) + Math.pow((pointDestination.y - pointOrigin.y), 2));
  }

  private getPointInterceptFrom(point1: Point, point2: Point, intercept: Point) {
    /// Get Slope
    const a = (point2.y - point1.y) / (point2.x - point1.x);
    /// Get intercept
    const b = (a * point1.x) - point1.y;
    /// Find new point
    if ( isNaN(intercept.x) ) {
      intercept.x = (intercept.y - b) / a;
    } else {
      intercept.y = (a * intercept.x) + b;
    }
    // if( point2.x === this.firstX) {
      // console.log('special '+ point1.x + ' ' + point1.y +' ' + point2.x + ' ' +point2.y + ' ' +intercept.x + ' ' +intercept.y);
    // }
  }

  private setSize(mouseX: number, mouseY: number): void {
    if (this.object) {

      let size: number;

      let width = mouseX - this.firstX - this.strokeWidth.value;
      let height = mouseY - this.firstY - this.strokeWidth.value;

      if (Math.abs(width) < Math.abs(height)) {
        size = Math.abs(width);
      } else {
        size = Math.abs(height);
      }

      if (width < 0) {
        if (Math.abs(width) > Math.abs(height)) {
          this.x -= size;
        } else {
          this.x = mouseX;
        }
      }
      if (height < 0) {
        if (Math.abs(width) < Math.abs(height)) {
          this.y = this.firstY - size;
        } else {
          this.y = mouseY;
        }
      }

      if (size < 0) {
        size = 0;
      }

      this.drawingService.renderer.setAttribute(this.contour, 'x', (this.x).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'y', (this.y).toString());

      this.drawingService.renderer.setAttribute(this.contour, 'width', (size).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'height', (size).toString());

      this.getPoints(size, {x: mouseX, y: mouseY});
      // this.points = this.resizePolygon({x: mouseX, y: mouseY});
      // console.log(this.points);
      // console.log('END END');
      // this.adjustCoordinates(this.points);
      // console.log(mouseX, mouseY, size, this.firstX, this.firstY);
      this.drawingService.renderer.setAttribute(this.object, 'points', this.getPointsString());
    }
  }

  private setStyle(isLeft: boolean = true) {
    switch (this.polygonStyle.value) {
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
