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
  center: Point;

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
      this.firstX = offset.x.valueOf();
      this.firstY = offset.y.valueOf();

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
    this.getPointsXandY(radius, 0, size);
    /// repeat last step but add angle as you go for the n-1 remaining sides/points
    let angleToAdd = 0;
    for (let i = 1; i < this.vertexNumber.value; i++ ) {
      angleToAdd += angle;
      this.getPointsXandY(radius, angleToAdd, size);
    }
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

  private adjustCoordinates(points: Point[], size: number, center: Point) {
    /// Get center point
    let smallestDistanceCenterContour = Infinity;
    const distanceCenterContourArray: number[] = [];
    let distanceCenterContour: number;
    let closestQuadrantSides: {X: Point, Y: Point};
    const closestPointArray: Point[] = [];
    let closestPoint: Point;
    /// For each point
    for (const point of points) {
      /// Find in which quadrant the point belongs to
      // console.log('start');
      closestQuadrantSides = this.findPointClosestQuadrantSides(point, center, size);
      // distanceCenterPoint.push(distance.valueOf());
      /// Find the closest distance between the point and either mouseY or mouseX
        /// Find the two intercepts with the 2 (mouseX and mouseY) slopes
      this.getPointInterceptFrom(center, point, closestQuadrantSides.X);
      this.getPointInterceptFrom(center, point, closestQuadrantSides.Y);
        /// Find the closest of the two points
      const mouseXDistance = this.pythagore(closestQuadrantSides.X, point);
      // console.log('mouse distance');
      // console.log(mouseXDistance);
      const mouseYDistance = this.pythagore(closestQuadrantSides.Y, point);
      // console.log(mouseYDistance);
      if (mouseXDistance < mouseYDistance) {
        closestPoint = closestQuadrantSides.X;
      } else { /// X > Y or X == Y
        closestPoint = closestQuadrantSides.Y;
      }
      closestPointArray.push(closestPoint);
      // console.log('closestPoint');
      // console.log(closestPoint);
      /// Get distance from center to closest point/countour
      distanceCenterContour = this.pythagore(closestPoint, center);
      distanceCenterContourArray.push(distanceCenterContour);
      // console.log('end');
    }
    for ( const distance of distanceCenterContourArray) {
      if (distance < smallestDistanceCenterContour) {
        smallestDistanceCenterContour = distance;
      }
    }
    // console.log('getPoints called in adjust');
    // console.log(smallestDistanceCenterContour);
    // console.log(points[distanceCenterContourArray.indexOf(smallestDistanceCenterContour)]);
    // console.log(closestPointArray[distanceCenterContourArray.indexOf(smallestDistanceCenterContour)]);
    if (this.vertexNumber.value === 4) {
      const index = distanceCenterContourArray.indexOf(smallestDistanceCenterContour);
      const seed: Point = closestPointArray[index];
      this.points[0] = seed;
      /// Calculate all the other points from the seed
      if ( seed.x > center.x && seed.y > center.y) {
        // console.log('seed.x >, seed.y >'); console.log(seed);
        this.points[1] = {x: seed.x, y: seed.y - size - this.strokeWidth.value };
        this.points[2] = {x: seed.x - size - this.strokeWidth.value, y: seed.y - size - this.strokeWidth.value };
        this.points[3] = {x: seed.x - size - this.strokeWidth.value, y: seed.y };
      } else if ( seed.x > center.x && seed.y <= center.y ) {
        this.points[1] = {x: seed.x - size - this.strokeWidth.value , y: seed.y };
        this.points[2] = {x: seed.x - size - this.strokeWidth.value , y: seed.y + size + this.strokeWidth.value };
        this.points[3] = {x: seed.x, y: seed.y + size + this.strokeWidth.value };
      } else if ( seed.x <= center.x && seed.y > center.y ) {
        this.points[1] = {x: seed.x + this.strokeWidth.value + size, y: seed.y };
        this.points[2] = {x: seed.x + size + this.strokeWidth.value, y: seed.y - size - this.strokeWidth.value };
        this.points[3] = {x: seed.x, y: seed.y - size - this.strokeWidth.value };
      } else { /// seed.x <= center.x && seed.y <= center.y
        /// seed.x === this.firstX && seed.y === this.firstY
        this.points[1] = {x: seed.x, y: seed.y + size + this.strokeWidth.value };
        this.points[2] = {x: seed.x + size + this.strokeWidth.value, y: seed.y + size + this.strokeWidth.value };
        this.points[3] = {x: seed.x + size + this.strokeWidth.value, y: seed.y };
      }
    } else {
      this.getPoints(smallestDistanceCenterContour * 2, center);
    }
  }

  private findPointClosestQuadrantSides(point: Point, center: Point, size: number): {X: Point, Y: Point} {
    const pointWithKnownX: Point = {x: NaN, y: NaN};
    const pointWithKnownY: Point = {x: NaN, y: NaN};
    if ( this.x > this.firstX && this.y > this.firstY ) {
      if (point.x >= center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX + this.strokeWidth.value + size;
        pointWithKnownY.y = this.firstY + this.strokeWidth.value + size;
      } else if (point.x >= center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX + this.strokeWidth.value + size;
        pointWithKnownY.y = this.firstY;
      } else if (point.x < center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY + this.strokeWidth.value + size;
      } else {// (point.x < center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY;
      }
    } else if ( this.x > this.firstX && this.y <= this.firstY ) {
      if (point.x >= center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX + this.strokeWidth.value + size;
        pointWithKnownY.y = this.firstY;
      } else if (point.x >= center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX + this.strokeWidth.value + size;
        pointWithKnownY.y = this.firstY - this.strokeWidth.value - size;
      } else if (point.x < center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY;
      } else {// (point.x < center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY - this.strokeWidth.value - size;
      }
    } else if ( this.x <= this.firstX && this.y > this.firstY) {
      if (point.x >= center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY + this.strokeWidth.value + size;
      } else if (point.x >= center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY;
      } else if (point.x < center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX - this.strokeWidth.value - size;
        pointWithKnownY.y = this.firstY + this.strokeWidth.value + size;
      } else {// (point.x < center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX - this.strokeWidth.value - size;
        pointWithKnownY.y = this.firstY;
      }
    } else { /// this.x <= this.firstX && this.y <= this.firstY
      if (point.x >= center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY;
      } else if (point.x >= center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX;
        pointWithKnownY.y = this.firstY - this.strokeWidth.value - size;
      } else if (point.x < center.x && point.y >= center.y) {
        pointWithKnownX.x = this.firstX - this.strokeWidth.value - size;
        pointWithKnownY.y = this.firstY;
      } else {// (point.x < center.x && point.y < center.y) {
        pointWithKnownX.x = this.firstX - this.strokeWidth.value - size;
        pointWithKnownY.y = this.firstY - this.strokeWidth.value - size;
      }
    }
    /// idea here would be to use this.x and this.y to determine in which quadrant we are! compared to this.firstX and this.firstY!
    /// this.x and this.y are always two of the sides, the other two will depend.
    /// need to make another if surrounding this same if
    // console.log('start');
    // console.log(size); console.log('/');
    // console.log(this.x, this.y); console.log('/'); console.log( this.firstX, this.firstY); console.log('/'); console.log(pointWithKnownX.x, pointWithKnownY.y);
    return {X: pointWithKnownX, Y: pointWithKnownY};
  }

  private pythagore(pointDestination: Point, pointOrigin: Point): number {
    return Math.sqrt(Math.pow((pointDestination.x - pointOrigin.x), 2) + Math.pow((pointDestination.y - pointOrigin.y), 2));
  }

  private getPointInterceptFrom(point1: Point, point2: Point, intercept: Point) {
    /// Get Slope
    const a = (point2.y - point1.y) / (point2.x - point1.x);
    /// Get intercept
    const b =  point1.y - (a * point1.x);
    /// Find new point
    if ( isNaN(intercept.x) ) {
      intercept.x = (intercept.y - b) / a;
    } else {
      intercept.y = (a * intercept.x) + b;
    }
    // console.log('inside get point intercept');
    // console.log(a, b);
    // console.log(point1, point2, intercept);
  }

  private putPolygonInCorner(points: Point[]){
    const offset: {x: number, y: number} = this.findClosestXandY(points);
    for ( const point of points ) {
      point.x += offset.x;
      point.y += offset.y;
    }
  }

  private findClosestXandY(points: {x: number, y: number}[]): {x: number, y: number} {
    let smallestXDelta = Infinity;
    let smallestYDelta = Infinity;
    let isXNegative = false;
    let isYNegative = false;

    for ( const point of this.points) {
      /// Calculate the deltas
      const tempXDelta = Math.abs(this.firstX - point.x);
      if ( tempXDelta < smallestXDelta ) {
        smallestXDelta = tempXDelta;
        /// Determine the signs
        if ( point.x > this.firstX ) {
          isXNegative = true;
        } else {
          isXNegative = false;
        }
      }
      const tempYDelta = Math.abs(this.firstY - point.y);
      if ( tempYDelta < smallestYDelta ) {
        smallestYDelta = tempYDelta;
        /// Determine the signs
        if ( point.y > this.firstY ) {
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

  private setSize(mouseX: number, mouseY: number): void {
    if (this.object) {

      let size: number;

      const width = mouseX - this.firstX.valueOf() - this.strokeWidth.value * 2;
      const height = mouseY - this.firstY.valueOf() - this.strokeWidth.value * 2;

      if (Math.abs(width) < Math.abs(height)) {
        size = Math.abs(width);
      } else {
        size = Math.abs(height);
      }

      // if ( width < 0 && height < 0) {
      //   if (Math.abs(width) > Math.abs(height)) {
      //     this.y = mouseY.valueOf();
      //     this.x = this.y;
      //   } else {
      //     this.x = mouseX.valueOf();
      //     this.y = this.x;
      //   }
      // } else if ( width < 0 && height >= 0 ) {
      //   if (Math.abs(width) > Math.abs(height)) {
      //     this.y = this.firstY.valueOf();
      //     this.x = this.y;
      //   } else {
      //     this.x = mouseX.valueOf();
      //     this.y = this.x;
      //   }
      // } else if ( width >= 0 && height < 0 ) {
      //   if (Math.abs(width) > Math.abs(height)) {
      //     this.y = mouseY.valueOf();
      //     this.x = this.y;
      //   } else {
      //     this.x = this.firstX.valueOf();
      //     this.y = this.x;
      //   }
      // } else {
      //   if (Math.abs(width) > Math.abs(height)) {
      //     this.y = this.firstY.valueOf() + mouseY.valueOf();
      //     this.x = this.y;
      //   } else {
      //     this.x = this.firstX.valueOf() + mouseX.valueOf();
      //     this.y = this.x;
      //   }
      // }
      // this.x = this.x/2;
      // this.y = this.y/2;

      if (width < 0) {
        if (Math.abs(width) > Math.abs(height)) {
          this.x = this.firstX - size;
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


      this.center = {x: this.x + size / 2 + this.strokeWidth.value , y: this.y + size/2 + this.strokeWidth.value }

      if (size < 0) {
        size = 0;
      }

      this.drawingService.renderer.setAttribute(this.contour, 'x', (this.x).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'y', (this.y).toString());

      this.drawingService.renderer.setAttribute(this.contour, 'width', (size).toString());
      this.drawingService.renderer.setAttribute(this.contour, 'height', (size).toString());

      this.getPoints(size, this.center);
      this.adjustCoordinates(this.points, size, this.center);
      this.putPolygonInCorner(this.points);

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
