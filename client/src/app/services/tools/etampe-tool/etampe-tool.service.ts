import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStamp } from '@fortawesome/free-solid-svg-icons';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_SCALE } from '../tools-constants';

const valeurMinimalDeFacteur = 1;
const minInterval = 1;
const maxInterval = 15;
let intervaleDegresRotation = 15;

@Injectable({
  providedIn: 'root',
})

export class EtampeToolService implements ITools {
  readonly id = ToolIdConstants.ETAMPE_ID;
  readonly faIcon: IconDefinition = faStamp;
  readonly toolName = 'Etampe';
  parameters: FormGroup;
  private etampe: FormControl;
  private facteurSize: FormControl;
  private object: SVGImageElement | null;
  OldX: number;
  OldY: number;
  x: number;
  y: number;
  angleRotation = 0;

  constructor(private offsetManager: OffsetManagerService, private drawingService: DrawingService) {
    this.etampe = new FormControl('');
    this.facteurSize = new FormControl(INITIAL_SCALE, Validators.min(valeurMinimalDeFacteur));
    this.parameters = new FormGroup({
      etampe: this.etampe,
      facteurSize: this.facteurSize,
    });
    this.registerEventListenerOnScroll();
  }

  registerEventListenerOnScroll() {
    window.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        this.setAngleBackward();
      } else {
        this.setAngle();
      }
    });
  }


  onPressed(event: MouseEvent): void {
    if (event.button === 0) {
      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.OldX = offset.x;
      this.OldY = offset.y;
      this.x = offset.x - this.facteurSize.value / 2;
      this.y = offset.y - this.facteurSize.value / 2;

      this.object = this.drawingService.renderer.createElement('image', 'svg');
      this.drawingService.renderer.setAttribute(this.object, 'x', this.x.toString());
      this.drawingService.renderer.setAttribute(this.object, 'y', this.y.toString());
      this.drawingService.renderer.setAttribute(this.object, 'height', (this.facteurSize.value).toString());
      this.drawingService.renderer.setAttribute(this.object, 'width', (this.facteurSize.value).toString());
      this.drawingService.renderer.setAttribute(this.object, 'xlink:href', (this.etampe.value).toString());

      this.drawingService.renderer.setAttribute(this.object, 'transform', this.getRotation(this.OldX, this.OldY));
      if (this.object) {
        this.drawingService.addObject(this.object);
      }
    }
  }
  onRelease(event: MouseEvent) {
    return;
  }
  onMove(event: MouseEvent) {
    return;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.altKey) {
      event.preventDefault();
      intervaleDegresRotation = minInterval;
    }
  }
  onKeyUp(event: KeyboardEvent): void {
    intervaleDegresRotation = maxInterval;
  }
  getRotation(x: number, y: number): string {
    return '" transform=' + 'rotate(' + this.angleRotation + ',' + x + ',' + y + ')';
  }

  setAngle() {
    if (this.object) {
      this.angleRotation += intervaleDegresRotation;
    }
  }

  setAngleBackward() {
    if (this.object) {
      this.angleRotation -= intervaleDegresRotation;
    }
  }
}
