import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ITools } from '../ITools';
import { IObjects } from 'src/app/objects/IObjects';
import { ToolIdConstants } from '../tool-id-constants';
import { faStamp } from '@fortawesome/free-solid-svg-icons';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { EtampeObject } from 'src/app/objects/object-etampe/etampe';
import { INITIAL_SCALE } from '../tools-constants';

@Injectable({
  providedIn: 'root'
})
export class EtampeToolService implements ITools {
  readonly id = ToolIdConstants.ETAMPE_ID;
  readonly faIcon: IconDefinition = faStamp;
  readonly toolName = 'Etampe';
  parameters: FormGroup;
  private etampe: FormControl;
  private facteur: FormControl;
  private object: EtampeObject | null;


  constructor(private offsetManager: OffsetManagerService) {
    this.etampe = new FormControl('');
    this.facteur = new FormControl(INITIAL_SCALE);
    this.parameters = new FormGroup({
      etampe: this.etampe,
      facteur: this.facteur,
    });
  }
  onPressed(event: MouseEvent): IObjects | null {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    if (event.button === 0) {
      this.object = new EtampeObject(offset.x, offset.y, this.etampe.value);
      this.object.width = this.object.width * this.facteur.value;
      this.object.height = this.object.height * this.facteur.value;
      return this.object;
    }
    return null;
  }
  onRelease(event: MouseEvent) { }
  onMove(event: MouseEvent) { }
}
