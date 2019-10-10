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
  rectID: number[] = [];
  rectSelection: RectangleObject;
  object: IObjects[] = [];
  tmpX: number;
  tmpY: number;
  wasMoved = false;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService) { this.setRectSelection(); }

  onPressed(event: MouseEvent) {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.tmpX = offset.x;
    this.tmpY = offset.y;

    const target = event.target as Element;
    const obj = this.drawingService.getObject(Number(target.id));

    if (event.button === 0) {

      /*this.removeSelection();
      this.gotSelection = false;

      if (!(offset.x >= this.rectSelection.x && offset.x <= this.rectSelection.width
        && offset.y >= this.rectSelection.y && offset.y <= this.rectSelection.height)) {

        this.setRectSelection(offset.x, offset.y);
      }
     */

      /*const rec = this.drawingService.getObject(this.rectID[this.rectID.length - 1]);
      if (rec !== undefined) {
        this.rectSelection = rec as RectangleObject;
      }*/
      if (obj !== undefined && !this.rectID.includes(obj.id)) {
        this.removeSelection();
        this.object.push(obj);
        this.setSelection();
      } else if (!(offset.x >= this.rectSelection.x && offset.x <= (this.rectSelection.x + this.rectSelection.width)
        && offset.y >= this.rectSelection.y && offset.y <= (this.rectSelection.y + this.rectSelection.height))) {
        this.removeSelection();
      }

    }/* else if (event.button === 2) {
      if (obj !== undefined) {
        if (this.object.indexOf(obj) !== -1) {
          const index = this.object.indexOf(obj, 0);
          if (index > -1) {
            this.object.splice(index, 1);
          }
        } else {
          this.object.push(obj);
        }
      }
      this.wasMoved = true;
    }*/
    this.rectID.push(this.drawingService.lastObjectId + 1);
    return this.rectSelection;
  }

  onRelease(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (event.button === 0) {
      if (this.wasMoved) {
        this.findObjects();
      } else if (!this.wasMoved && this.object.length > 1
        && ((offset.x >= this.rectSelection.x && offset.x <= (this.rectSelection.x + this.rectSelection.width)
          && offset.y >= this.rectSelection.y && offset.y <= (this.rectSelection.y + this.rectSelection.height)))) {
        this.removeSelection();
      }
    }/* else if (event.button === 2) {
      this.drawingService.removeObject(this.rectID);
    }*/

    if (this.object.length > 0) {
      this.setSelection();
    } else {
      this.removeSelection();
      this.setRectSelection();
    }

    this.wasMoved = false;
  }

  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (event.button === 0 && this.object.length === 1) {
      this.moveObject(event.movementX, event.movementY);
    } else if (offset.x >= this.rectSelection.x && offset.x <= (this.rectSelection.x + this.rectSelection.width)
      && offset.y >= this.rectSelection.y && offset.y <= (this.rectSelection.y + this.rectSelection.height)) {
      this.moveAll(event.movementX, event.movementY);
      this.wasMoved = true;
    } else if (event.button === 0 || event.button === 2) {
      this.setSize(offset.x, offset.y);
      this.wasMoved = true;
    }
  }

  private setSize(x: number, y: number): void {
    this.rectSelection.x = this.tmpX;
    this.rectSelection.y = this.tmpY;
    this.rectSelection.width = x - this.tmpX;
    this.rectSelection.height = y - this.tmpY;

    if (this.rectSelection.width < 0) {
      this.rectSelection.x = x;
      this.rectSelection.width = this.tmpX - x;
    }
    if (this.rectSelection.height < 0) {
      this.rectSelection.y = y;
      this.rectSelection.height = this.tmpY - y;
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

  private moveObject(x: number, y: number) {
    this.object[0].x += x;
    this.object[0].y += y;
    this.rectSelection.x += x;
    this.rectSelection.y += y;
  }

  private moveAll(x: number, y: number) {
    this.object.forEach((obj) => {
      obj.x += x;
      obj.y += y;
    });

    this.rectSelection.x += x;
    this.rectSelection.y += y;
  }

  private setSelection() {
    this.gotSelection = true;
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

  removeSelection() {
    this.object = [];
    this.rectID.forEach((id) => {
      this.drawingService.removeObject(id);
    });
    this.rectID = [];
  }

  private setRectSelection(x: number = 0, y: number = 0) {
    this.rectSelection = new RectangleObject(x, y, 5, 'border');
    this.rectSelection.primaryColor = { rgb: { r: 0, g: 0, b: 150 }, a: 0.25 };
    this.rectSelection.secondaryColor = { rgb: { r: 0, g: 0, b: 200 }, a: 1 };
  }
}
