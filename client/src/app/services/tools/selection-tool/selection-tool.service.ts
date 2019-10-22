import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPoo } from '@fortawesome/free-solid-svg-icons';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class SelectionToolService implements ITools {
  readonly id: number = ToolIdConstants.SELECTION_ID;
  readonly faIcon: IconDefinition = faPoo;
  readonly toolName = 'Sélection';
  parameters: FormGroup;

  private gotSelection = false;

  private rectID: number[] = [];
  private rectSelection: SVGRectElement;
  private rectSelectionId: number;
  private rectInversement: SVGRectElement;
  private rectInversementId: number;
  private firstInvObj: SVGElement | null;
  private recStrokeWidth = 1;

  private objects: SVGElement[] = [];
  private tmpX: number;
  private tmpY: number;
  private wasMoved = false;
  private isIn = false;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService) { }

  onPressed(event: MouseEvent) {
    if (event.button === 0 || event.button === 2) {
      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.tmpX = offset.x;
      this.tmpY = offset.y;

      const target = event.target as SVGElement;
      const obj = this.drawingService.getObject(Number(target.id));

      if (event.button === 0) {
        if (this.isInside(offset.x, offset.y)) {
          this.isIn = true;
        } else {
          this.removeSelection();
          if (obj && !this.rectID.includes(Number(obj.getAttribute('id')))
            && (this.objects.length < 2 || !this.objects.includes(obj))) {
            this.objects.push(obj);
            this.setSelection();
            this.isIn = true;
            this.rectSelectionId = this.drawingService.addObject(this.rectSelection);
            this.rectID.push(this.rectSelectionId);
            return;
          }
        }
      } else if (event.button === 2) {
        if (obj && !this.rectID.includes(Number(obj.id))) {
          this.firstInvObj = obj;
        }
        this.rectInversementId = this.drawingService.addObject(this.rectInversement);

        this.wasMoved = true;
      }

      if (this.gotSelection) {
        return;
      }

      this.rectSelectionId = this.drawingService.addObject(this.rectSelection);
      this.rectID.push(this.rectSelectionId);
    }
  }

  onRelease(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      if (event.button === 0) {
        if (this.wasMoved && !this.gotSelection) {
          this.findObjects(this.rectSelection);
        } else if (!this.wasMoved && this.objects.length >= 1
          && this.isIn) {
          this.objects = [];
          const target = event.target as SVGElement;
          const obj = this.drawingService.getObject(Number(target.id));
          if (obj) {
            this.objects.push(obj);
          }
        }
      } else if (event.button === 2) {
        this.findObjects(this.rectInversement);
        this.drawingService.removeObject(this.rectInversementId);
        this.setRectInversement();
      }

      if (this.objects.length > 0) {
        this.setSelection();
      } else {
        this.removeSelection();
        this.setRectSelection();
      }

      this.firstInvObj = null;
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
        this.setSize(offset.x, offset.y, this.rectSelection);
        this.wasMoved = true;
      }
    } else if (event.buttons === 2) {
      this.setSize(offset.x, offset.y, this.rectInversement);
    }
  }

  // tslint:disable-next-line: no-empty
  onKeyDown(event: KeyboardEvent): void { }

  // tslint:disable-next-line: no-empty
  onKeyUp(event: KeyboardEvent): void { }

  private setSize(x: number, y: number, rectUsing: SVGRectElement): void {
    let width = x - this.tmpX - this.recStrokeWidth;
    let height = y - this.tmpY - this.recStrokeWidth;

    this.drawingService.renderer.setAttribute(rectUsing, 'x', (this.tmpX + this.recStrokeWidth / 2).toString());
    this.drawingService.renderer.setAttribute(rectUsing, 'y', (this.tmpY + this.recStrokeWidth / 2).toString());

    if (width < 0) {
      this.drawingService.renderer.setAttribute(rectUsing, 'x', (x + this.recStrokeWidth / 2).toString());
      width = Math.abs(width) - 2 * this.recStrokeWidth;
    }
    if (height < 0) {
      this.drawingService.renderer.setAttribute(rectUsing, 'y', (y + this.recStrokeWidth / 2).toString());
      height = Math.abs(height) - 2 * this.recStrokeWidth;
    }

    if (width < 0) {
      width = 0;
    }
    if (height < 0) {
      height = 0;
    }

    this.drawingService.renderer.setAttribute(rectUsing, 'height', (height).toString());
    this.drawingService.renderer.setAttribute(rectUsing, 'width', (width).toString());
  }

  private findObjects(rectUsing: SVGRectElement) {
    // const a = this.drawingService.drawing as SVGSVGElement;
    // const r = a.createSVGRect();
    // r.x = Number(rectUsing.getAttribute('x'));
    // r.y = Number(rectUsing.getAttribute('y'));
    // r.width = Number(rectUsing.getAttribute('width'));
    // r.height = Number(rectUsing.getAttribute('height'));

    const allObject: SVGElement[] = [];
    this.drawingService.getObjectList().forEach((value) => {
      if (!this.rectID.includes(Number(value.getAttribute('id')))
        && Number(value.getAttribute('id')) !== this.rectInversementId
        && value.tagName !== 'defs' && Number(value.getAttribute('id')) !== 1) {
        allObject.push(value);
      }
    });

    const rectBox = rectUsing.getBoundingClientRect();

    if (rectUsing === this.rectSelection) {
      allObject.forEach((obj) => {
        const box = obj.getBoundingClientRect();
        if (!(rectBox.left > box.right + this.strToNum(obj.style.strokeWidth) / 2
          || rectBox.right < box.left - this.strToNum(obj.style.strokeWidth) / 2
          || rectBox.top > box.bottom + this.strToNum(obj.style.strokeWidth) / 2
          || rectBox.bottom < box.top - this.strToNum(obj.style.strokeWidth) / 2)) {
          this.objects.push(obj);
        }
      });

      //   a.getIntersectionList(r, a)
      //     .forEach((element) => {
      //       const obj = this.drawingService.getObject(Number(element.id)) as SVGElement;
      //       this.objects.push(obj);
      //     });
    } else if (rectUsing === this.rectInversement) {
      allObject.forEach((obj) => {
        const box = obj.getBoundingClientRect();
        if (!(rectBox.left > box.right || rectBox.right < box.left || rectBox.top > box.bottom || rectBox.bottom < box.top)) {
          if (obj && obj !== this.firstInvObj && !this.rectID.includes(Number(obj.getAttribute('id')))) {
            if (this.objects.includes(obj)) {
              this.objects.splice(this.objects.indexOf(obj, 0), 1);
            } else {
              this.objects.push(obj);
            }
          }
        }
      });

      //   a.getIntersectionList(r, a)
      //     .forEach((element) => {
      //       const obj = this.drawingService.getObject(Number(element.id));
      //       if (obj && obj !== this.firstInvObj) {
      //         if (this.objects.includes(obj)) {
      //           this.objects.splice(this.objects.indexOf(obj, 0), 1);
      //         } else {
      //           this.objects.push(obj);
      //         }
      //       }
      //     });
      if (this.firstInvObj) {
        if (this.objects.includes(this.firstInvObj)) {
          this.objects.splice(this.objects.indexOf(this.firstInvObj, 0), 1);
        } else {
          this.objects.push(this.firstInvObj);
        }
      }
    }
  }

  private moveObjects(x: number, y: number) {
    let transform = this.rectSelection.getAttribute('transform');
    if (transform) {
      const translate = transform.replace(/[^-?\d]+/g, ',').split(',').filter((el) => el !== '');
      this.drawingService.renderer.setAttribute(this.rectSelection, 'transform',
        `translate(${Number(translate[0]) + x},${Number(translate[1]) + y})`);
    } else {
      this.drawingService.renderer.setAttribute(this.rectSelection, 'transform', `translate(${x},${y})`);
    }
    this.objects.forEach((obj) => {
      transform = obj.getAttribute('transform');
      if (transform) {
        const transformPart = transform.split(' ');

        let rotate = '';
        transformPart.forEach((str) => { if (str.startsWith('rotate')) { rotate = str; } });
        let translate = '';
        transformPart.forEach((str) => {
          if (str.startsWith('translate')) {
            translate = str;
          } else if (translate === '') {
            translate = '0 0';
          }
        });
        const translateElm = translate.replace(/[^-?\d]+/g, ',').split(',').filter((el) => el !== '');
        this.drawingService.renderer.setAttribute(obj, 'transform',
          `translate(${Number(translateElm[0]) + x},${Number(translateElm[1]) + y}) ${rotate}`);
      } else {
        this.drawingService.renderer.setAttribute(obj, 'transform', `translate(${x},${y})`);
      }
    });
  }

  private setSelection() {
    this.gotSelection = true;
    const XFactor = (this.drawingService.drawing as SVGSVGElement).getBoundingClientRect().left;
    this.drawingService.renderer.setAttribute(this.rectSelection, 'transform', `translate(0 0)`);
    let boundingRect = this.objects[0].getBoundingClientRect();

    if (this.objects.length === 1 || !this.wasMoved) {
      this.drawingService.renderer
        .setAttribute(
          this.rectSelection, 'x',
          `${boundingRect.left - XFactor - this.strToNum(this.objects[0].style.strokeWidth) / 2}`,
        );

      this.drawingService.renderer
        .setAttribute(
          this.rectSelection, 'y',
          `${boundingRect.top - this.strToNum(this.objects[0].style.strokeWidth) / 2}`,
        );

      this.drawingService.renderer
        .setAttribute(
          this.rectSelection, 'width',
          `${boundingRect.width + this.strToNum(this.objects[0].style.strokeWidth)}`,
        );

      this.drawingService.renderer
        .setAttribute(
          this.rectSelection, 'height',
          `${boundingRect.height + this.strToNum(this.objects[0].style.strokeWidth)}`,
        );

    } else {
      let xL = boundingRect.left - this.strToNum(this.objects[0].style.strokeWidth) / 2;
      let xR = boundingRect.right + this.strToNum(this.objects[0].style.strokeWidth) / 2;

      let yT = boundingRect.top - this.strToNum(this.objects[0].style.strokeWidth) / 2;
      let yB = boundingRect.bottom + this.strToNum(this.objects[0].style.strokeWidth) / 2;

      this.objects.forEach((elm) => {
        let value;
        boundingRect = elm.getBoundingClientRect();

        value = boundingRect.left - this.strToNum(elm.style.strokeWidth) / 2;
        if (value < xL) {
          xL = value;
        }

        value = boundingRect.right + this.strToNum(this.objects[0].style.strokeWidth) / 2;
        if (value > xR) {
          xR = value;
        }

        value = boundingRect.top - this.strToNum(this.objects[0].style.strokeWidth) / 2;
        if (value < yT) {
          yT = value;
        }

        value = boundingRect.bottom + this.strToNum(this.objects[0].style.strokeWidth) / 2;
        if (value > yB) {
          yB = value;
        }
      });

      this.drawingService.renderer.setAttribute(this.rectSelection, 'x', `${xL - XFactor}`);
      this.drawingService.renderer.setAttribute(this.rectSelection, 'y', `${yT}`);

      this.drawingService.renderer.setAttribute(this.rectSelection, 'width', `${xR - xL}`);
      this.drawingService.renderer.setAttribute(this.rectSelection, 'height', `${yB - yT}`);
    }
  }

  removeSelection() {
    this.objects = [];
    this.rectID.forEach((id) => {
      this.drawingService.removeObject(id);
    });
    this.rectID = [];
    this.gotSelection = false;

    this.setRectSelection();
    this.setRectInversement();
  }

  private setRectSelection() {
    this.rectSelection = this.drawingService.renderer.createElement('rect', 'svg');
    this.drawingService.renderer.setStyle(this.rectSelection, 'stroke', `rgba(0, 0, 200, 1)`);
    this.drawingService.renderer.setStyle(this.rectSelection, 'stroke-width', `${this.recStrokeWidth}`);
    this.drawingService.renderer.setStyle(this.rectSelection, 'stroke-dasharray', `10,10`);
    this.drawingService.renderer.setStyle(this.rectSelection, 'd', `M5 40 l215 0`);
    this.drawingService.renderer.setStyle(this.rectSelection, 'fill', `none`);
    this.drawingService.renderer.setAttribute(this.rectSelection, 'pointer-events', 'none');
  }

  private setRectInversement() {
    this.rectInversement = this.drawingService.renderer.createElement('rect', 'svg');
    this.drawingService.renderer.setStyle(this.rectInversement, 'stroke', `rgba(200, 0, 0, 1)`);
    this.drawingService.renderer.setStyle(this.rectInversement, 'stroke-width', `${this.recStrokeWidth}`);
    this.drawingService.renderer.setStyle(this.rectInversement, 'stroke-dasharray', `10,10`);
    this.drawingService.renderer.setStyle(this.rectInversement, 'd', `M5 40 l215 0`);
    this.drawingService.renderer.setStyle(this.rectInversement, 'fill', `none`);
    this.drawingService.renderer.setAttribute(this.rectInversement, 'pointer-events', 'none');
  }

  private isInside(x: number, y: number) {
    if (this.rectSelection) {
      return x >= (Number(this.rectSelection.getAttribute('x')) - this.recStrokeWidth / 2)
        && x <= (Number(this.rectSelection.getAttribute('x')) + Number(this.rectSelection.getAttribute('width')) + this.recStrokeWidth / 2)
        && y >= (Number(this.rectSelection.getAttribute('y')) - this.recStrokeWidth / 2)
        && y <= (Number(this.rectSelection.getAttribute('y')) +
          Number(this.rectSelection.getAttribute('height')) + this.recStrokeWidth / 2);
    }
    return false;
  }

  private strToNum(str: string | null) {
    return str ? +str.replace(/[^-?\d]+/g, ',').split(',').filter((el) => el !== '') : 0;
  }
}
