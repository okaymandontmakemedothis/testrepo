import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class ToolsApplierColorsService implements ITools {
  readonly id = ToolIdConstants.APPLIER_ID;
  readonly faIcon: IconDefinition = faTint;
  readonly toolName = 'Applicateur de couleur';
  parameters: FormGroup;
  object: IObjects | undefined;

  onPressed(event: MouseEvent): IObjects | null {
    const target = event.target as Element;
    this.object = this.drawing.getObject(Number(target.id));
    if (this.object) {
      if (event.button === 0) { // left click so set fill to a color
        this.object.primaryColor = { rgb: this.color.primaryColor, a: this.color.primaryAlpha };
      } else {     // right click so set stroke to a color
        this.object.secondaryColor = { rgb: this.color.secondaryColor, a: this.color.secondaryAlpha };
      }
      return null;
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

  constructor(private drawing: DrawingService, private color: ToolsColorService) { }
}
