import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { IObjects } from 'src/app/objects/IObjects';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

/// Outil pour assigner la couleur d'un objet a la couleur primaire et secondaire, 
/// clique gauche change la couleur primaire et clique droit la couleur secondaire
@Injectable({
  providedIn: 'root',
})
export class PipetteToolService implements ITools {
  readonly id = ToolIdConstants.PIPETTE_ID;
  readonly faIcon: IconDefinition = faEyeDropper;
  readonly toolName = 'Pipette';
  parameters: FormGroup;
  object: IObjects | undefined;

  constructor(private drawingService: DrawingService, private toolsColorService: ToolsColorService) { }

  /// À l'appuis d'un clique de souris, on récupère l'objet cliqué et on modifie sa couleur
  onPressed(event: MouseEvent): IObjects | null {
    const target = event.target as Element;
    this.object = this.drawingService.getObject(Number(target.id));
    if (this.object) {
      if (event.button === 0) { // left click so set primary color to color of object
        this.toolsColorService.setPrimaryColor(this.object.primaryColor.rgb, this.object.primaryColor.a);
      } else {     // right click so set secondary color to color of object
        this.toolsColorService.setSecondaryColor(this.object.primaryColor.rgb, this.object.primaryColor.a);
      }
      return null;
    } else {
      return null;
    }
  }

  /// Fonction non utilisé pour cet outil
  onRelease(event: MouseEvent) {
    return null;
  }

  /// Fonction non utilisé pour cet outil
  onMove(event: MouseEvent) {
    return null;
  }
}
