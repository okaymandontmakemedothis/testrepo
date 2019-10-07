import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStamp } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { EtampeObject } from 'src/app/objects/object-etampe/etampe';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_SCALE } from '../tools-constants';

@Injectable({
  providedIn: 'root',
})

export class EtampeToolService implements ITools {
  readonly id = ToolIdConstants.ETAMPE_ID;
  readonly faIcon: IconDefinition = faStamp;
  readonly toolName = 'Etampe';
  parameters: FormGroup;
  private etampe: FormControl;
  private facteur: FormControl;
  private object: EtampeObject | null;
  cran = 15;

  constructor(private offsetManager: OffsetManagerService, private drawingService: DrawingService) {
    this.etampe = new FormControl('');
    this.facteur = new FormControl(INITIAL_SCALE, Validators.min(0.01));
    this.parameters = new FormGroup({
      etampe: this.etampe,
      facteur: this.facteur,
    });
    this.registerEventListenerOnScroll();
    this.registerEventListenerOnAlt();
  }

  registerEventListenerOnScroll() {
    window.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        this.setAngleBackward();
        this.drawingService.draw();
      } else {
        this.setAngle();
        this.drawingService.draw();
      }
    });
  }

  private registerEventListenerOnAlt() {
    window.addEventListener('keydown', (event) => {
      if (event.altKey) {
        event.preventDefault();
        this.cran = 1;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (!event.altKey) {
        this.cran = 15;
      }
    });
  }

  onPressed(event: MouseEvent): IObjects | null {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);

    if (event.button === 0) {
      this.object = new EtampeObject(offset.x, offset.y, this.etampe.value);
      this.object.width = this.object.width * this.facteur.value;
      this.object.height = this.object.height * this.facteur.value;
      return this.object;
    } else {
      return null;
    }

  }
  onRelease(event: MouseEvent) {
    return null;
  }
  onMove(event: MouseEvent) {
    return null;
  }

  setAngle() {
    if (this.object) {
      this.object.angle = this.object.angle + this.cran;
      console.log(this.object.angle);
    }
  }

  setAngleBackward() {
    if (this.object) {
      this.object.angle = this.object.angle - this.cran;
      console.log(this.object.angle);
    }
  }
}
