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

  firstSelection = true;
  rectSelection: RectangleObject | null;
  object: IObjects[] = [];
  firstX: number;
  firstY: number;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService) { }

  onPressed(event: MouseEvent) {
    if (!this.firstSelection) {
      this.drawingService.removeObject(this.drawingService.lastObjectId);
    }
    this.firstSelection = false;
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
    if (this.object.length > 0) {
      this.findObjects();
      this.setSelection();
    } else {
      this.findObjects();
      this.drawingService.removeObject(this.drawingService.lastObjectId);
    }
    this.rectSelection = null;
  }

  onMove(event: MouseEvent): void {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.setSize(offset.x, offset.y);
    //this.findObjects(offset.x, offset.y);
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
    const a = (document.getElementById('svgCanvas') as unknown) as SVGElement;
    console.log(a.childNodes.item(a.childNodes.length - 1));
  }

  private setSelection() {
    if (this.rectSelection) {
      if (this.object.length === 1) {
        this.rectSelection.x = this.object[0].x - this.object[0].strokeWidth / 2;
        this.rectSelection.y = this.object[0].y - this.object[0].strokeWidth / 2;

        this.rectSelection.width = this.object[0].width + this.object[0].strokeWidth;
        this.rectSelection.height = this.object[0].height + this.object[0].strokeWidth;
      } else {
        let upLeft = this.object[0];
        let downRight = this.object[0];
        this.object.forEach((element) => {
          if ((element.x - element.strokeWidth / 2) < (upLeft.x - upLeft.strokeWidth / 2) &&
            (element.y - element.strokeWidth / 2) < (upLeft.y - upLeft.strokeWidth / 2)) {
            upLeft = element;
          }
          if ((element.x + element.strokeWidth / 2) > (downRight.x + downRight.strokeWidth / 2) &&
            (element.y + element.strokeWidth / 2) > (downRight.y + downRight.strokeWidth / 2)) {
            downRight = element;
          }
        });

        this.rectSelection.x = upLeft.x - upLeft.strokeWidth / 2;
        this.rectSelection.y = upLeft.y - upLeft.strokeWidth / 2;

        this.rectSelection.width = downRight.width + upLeft.strokeWidth + downRight.strokeWidth / 2;
        this.rectSelection.height = downRight.height + upLeft.strokeWidth + downRight.strokeWidth / 2;
      }
    }
  }
}
