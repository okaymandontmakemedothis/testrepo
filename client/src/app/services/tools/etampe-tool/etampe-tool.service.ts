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
const defaultAngleRotation = 0;

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
  angleRotation: number;
  intervaleDegresRotation = 15;

  constructor(private offsetManager: OffsetManagerService, private drawingService: DrawingService) {
    this.etampe = new FormControl('');
    this.facteurSize = new FormControl(INITIAL_SCALE, Validators.min(valeurMinimalDeFacteur));
    this.parameters = new FormGroup({
      etampe: this.etampe,
      facteurSize: this.facteurSize,
    });

  }

  registerEventListenerOnScroll() {
    if (this.object) {
      this.object.addEventListener('wheel', (eventWheel) => {
        eventWheel.preventDefault();
        if (eventWheel.target === this.object) {
          if (eventWheel.deltaY < 0) {
            this.setAngleBackward();
          } else {
            this.setAngle();
          }
        }
      });
    }
  }

  onPressed(event: MouseEvent): void {
    if (event.button === 0) {
      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.angleRotation = 0;
      this.OldX = offset.x;
      this.OldY = offset.y;
      this.x = offset.x - this.facteurSize.value / 2;
      this.y = offset.y - this.facteurSize.value / 2;

      this.object = this.drawingService.renderer.createElement('image', 'svg');
      this.drawingService.renderer.setAttribute(this.object, 'x', this.x.toString());
      this.drawingService.renderer.setAttribute(this.object, 'y', this.y.toString());
      this.drawingService.renderer.setAttribute(this.object, 'height', (this.facteurSize.value).toString());
      this.drawingService.renderer.setAttribute(this.object, 'width', (this.facteurSize.value).toString());
      this.drawingService.renderer.setAttribute(this.object, 'href', this.etampe.value);
      this.drawingService.renderer.setAttribute(this.object, 'transform', this.getRotation(defaultAngleRotation));
      if (this.object) {
        this.drawingService.addObject(this.object);
      }
      this.registerEventListenerOnScroll();
    }
  }
  onRelease(event: MouseEvent) {
    return;
  }
  onMove(event: MouseEvent) {
    return;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.altKey && this.object) {
      event.preventDefault();
      event.stopPropagation();
      this.intervaleDegresRotation = minInterval;
    }
  }
  onKeyUp(event: KeyboardEvent): void {
    if (!event.altKey && this.object) {
      event.preventDefault();
      event.stopPropagation();
      this.intervaleDegresRotation = maxInterval;
    }
  }
  getRotation(angle: number): string {
    return 'rotate(' + angle + ',' + this.OldX + ',' + this.OldY + ')';
  }

  setAngle() {
    if (this.object) {
      this.angleRotation += this.intervaleDegresRotation;
      this.drawingService.renderer.setAttribute(this.object, 'transform', this.getRotation(this.angleRotation));

    }
  }

  setAngleBackward() {
    if (this.object) {
      this.angleRotation -= this.intervaleDegresRotation;
      this.drawingService.renderer.setAttribute(this.object, 'transform', this.getRotation(this.angleRotation));

    }
  }
}
