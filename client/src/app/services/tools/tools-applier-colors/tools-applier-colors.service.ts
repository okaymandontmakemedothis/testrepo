import { Injectable } from '@angular/core';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ToolsApplierColorsService implements ITools {
  readonly id = 2;
  faIcon: IconDefinition = faTint;
  toolName = 'Applicateur de couleur';
  parameters: FormGroup;
  object: IObjects | undefined;

  onPressed(event: MouseEvent): IObjects | null {
    const target = event.target as Element;
    this.object = this.drawing.getObject(Number(target.id));
    if (this.object) {
      if (event.button === 0) { // left click so set fill to a color
        this.object.primaryColor = { rgb: this.color.primaryColor, a: this.color.primaryAlpha };
      } else {     // right click so set stroke to a color
        document.addEventListener('contextmenu', (event2) => {
          event2.preventDefault(); // prevents the context menu of a right click to show
        });
        this.object.secondaryColor = { rgb: this.color.secondaryColor, a: this.color.secondaryAlpha };
      }
      return null;
    } else {
      return null;
    }
  }
  onRelease(event: MouseEvent) { }
  onMove(event: MouseEvent) { }

  constructor(private drawing: DrawingService, private color: ToolsColorService) { }
}
