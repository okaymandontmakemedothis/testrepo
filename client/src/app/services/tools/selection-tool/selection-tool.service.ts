import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPoo } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from '../../../objects/IObjects';
import { RectangleObject } from '../../../objects/object-rectangle/rectangle';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class SelectionToolService implements ITools {
  id: number = ToolIdConstants.SELECTION_ID;
  faIcon: IconDefinition = faPoo;
  toolName: string;
  parameters: FormGroup;

  gotSelection = false;
  rectID: number;
  rectSelection: RectangleObject | null;
  object: IObjects[] = [];
  firstX: number;
  firstY: number;
  wasMoved = false;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService) { }

  onPressed(event: MouseEvent) {
    this.gotSelection = false;
    this.object = [];
    const target = event.target as Element;
    const obj = this.drawingService.getObject(Number(target.id));
    if (obj !== undefined) {
      this.object.push(obj);
    }

    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.firstX = offset.x;
    this.firstY = offset.y;

    this.rectSelection = new RectangleObject(offset.x, offset.y, 1, 'border');
    this.rectSelection.primaryColor = { rgb: { r: 0, g: 0, b: 150 }, a: 0.25 };
    this.rectSelection.secondaryColor = { rgb: { r: 0, g: 0, b: 200 }, a: 1 };

    return this.rectSelection;
  }

  onRelease(event: MouseEvent): void {
    this.findObjects();
    if (this.object.length > 0) {
      this.setSelection();
    } else {
      this.drawingService.removeObject(this.drawingService.lastObjectId);
    }
    this.rectSelection = null;
    this.wasMoved = false;
  }

  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.setSize(offset.x, offset.y);
    this.wasMoved = true;
  }

  private setSize(x: number, y: number): void {
    if (this.rectSelection) {
      this.rectSelection.width = x - this.firstX;
      this.rectSelection.height = y - this.firstY;

      if (this.rectSelection.width < 0) {
        this.rectSelection.x = x;
        this.rectSelection.width = this.firstX - this.rectSelection.x;
      }
      if (this.rectSelection.height < 0) {
        this.rectSelection.y = y;
        this.rectSelection.height = this.firstY - this.rectSelection.y;
      }
    }
  }

  private findObjects() {
    if (this.rectSelection) {
      const a = (document.getElementById('svgCanvas') as unknown) as SVGSVGElement;

      const r = a.createSVGRect();
      r.x = this.rectSelection.x;
      r.y = this.rectSelection.y;
      r.width = this.rectSelection.width;
      r.height = this.rectSelection.height;

      a.getIntersectionList(r, a)
        .forEach((element) => {
          const obj = this.drawingService.getObject(Number(element.id));
          if (obj !== undefined) {
            this.object.push(obj);
          }
        });
      this.object.pop();
    }
  }

  private setSelection() {
    if (this.rectSelection) {
      this.gotSelection = true;
      this.rectID = this.drawingService.lastObjectId;
      if (this.object.length === 1 || !this.wasMoved) {
        this.rectSelection.x = this.object[0].x - this.object[0].strokeWidth / 2;
        this.rectSelection.y = this.object[0].y - this.object[0].strokeWidth / 2;

        this.rectSelection.width = this.object[0].width + this.object[0].strokeWidth;
        this.rectSelection.height = this.object[0].height + this.object[0].strokeWidth;
      } else {
        let xL = this.object[0].x - this.object[0].strokeWidth / 2;
        let xR = this.object[0].width + this.object[0].x + this.object[0].strokeWidth / 2;

        let yT = this.object[0].y - this.object[0].strokeWidth / 2;
        let yB = this.object[0].height + this.object[0].y + this.object[0].strokeWidth / 2;

        this.object.forEach((elm) => {
          if (elm.x - elm.strokeWidth / 2 < xL) {
            xL = elm.x - elm.strokeWidth / 2;
          }
          if (elm.width + elm.x + elm.strokeWidth / 2 > xR) {
            xR = elm.width + elm.x + elm.strokeWidth / 2;
          }
          if (elm.y - elm.strokeWidth / 2 < yT) {
            yT = elm.y - elm.strokeWidth / 2;
          }
          if (elm.height + elm.y + elm.strokeWidth / 2 > yB) {
            yB = elm.height + elm.y + elm.strokeWidth / 2;
          }
        });

        this.rectSelection.x = xL;
        this.rectSelection.y = yT;

        this.rectSelection.width = xR - xL;
        this.rectSelection.height = yB - yT;
      }
    }
  }

  removeSelection() {
    if (this.gotSelection) {
      this.drawingService.removeObject(this.rectID);
    }
  }
}
