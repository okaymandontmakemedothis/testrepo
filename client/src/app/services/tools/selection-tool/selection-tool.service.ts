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
  isIn = false;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService) { this.setRectSelection(); }

  onPressed(event: MouseEvent) {
    if (event.button === 0 || event.button === 2) {
      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.tmpX = offset.x;
      this.tmpY = offset.y;

      const target = event.target as Element;
      const obj = this.drawingService.getObject(Number(target.id));

      if (event.button === 0) {
        if (obj !== undefined && !this.rectID.includes(obj.id) && (this.object.length < 2 || !this.object.includes(obj))) {
          this.removeSelection();
          this.object.push(obj);
          this.setSelection();
          this.isIn = true;
          this.rectID.push(this.drawingService.lastObjectId + 1);
          return this.rectSelection;
        } else if (this.isInside(offset.x, offset.y)) {
          this.isIn = true;
        } else {
          this.removeSelection();
        }
      }

      else if (event.button === 2) {
        if (obj !== undefined && !this.rectID.includes(obj.id)) {
          if (this.object.includes(obj)) {
            const index = this.object.indexOf(obj, 0);
            if (index > -1) {
              this.object.splice(index, 1);
            }
          } else {
            this.object.push(obj);
          }
        }
        this.wasMoved = true;
      }


      if (this.gotSelection) {
        return null;
      }
      this.rectID.push(this.drawingService.lastObjectId + 1);
      return this.rectSelection;
    }
    return null;
  }

  onRelease(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      if (event.button === 0) {
        if (this.wasMoved && !this.gotSelection) {
          this.findObjects();
        } else if (!this.wasMoved && this.object.length > 1
          && this.isIn) {
          this.object = [];
          const target = event.target as Element;
          const obj = this.drawingService.getObject(Number(target.id));
          if (obj !== undefined) {
            this.object.push(obj);
          }
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
      this.isIn = false;
    }
  }

  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (event.buttons === 1) {
      if (this.isIn) {
        this.moveObjects(event.movementX, event.movementY);
        this.wasMoved = true;
      } else {
        this.setSize(offset.x, offset.y);
        this.wasMoved = true;
      }
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
      console.log(a);
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

  private moveObjects(x: number, y: number) {
    this.rectSelection.x += x;
    this.rectSelection.y += y;
    this.object.forEach((obj) => {
      obj.x += x;
      obj.y += y;
    });
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
    this.gotSelection = false;
  }

  private setRectSelection(x: number = 0, y: number = 0) {
    this.rectSelection = new RectangleObject(x, y, 5, 'border');
    this.rectSelection.primaryColor = { rgb: { r: 0, g: 0, b: 150 }, a: 0.25 };
    this.rectSelection.secondaryColor = { rgb: { r: 0, g: 0, b: 200 }, a: 1 };
  }

  private isInside(x: number, y: number) {
    return x >= this.rectSelection.x && x <= (this.rectSelection.x + this.rectSelection.width)
      && y >= this.rectSelection.y && y <= (this.rectSelection.y + this.rectSelection.height);
  }
}
