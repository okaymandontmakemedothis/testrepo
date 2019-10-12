import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
//import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

/// Outil pour changer la couleur d'un objet, clique gauche change la couleur primaire et clique droit la couleur secondaire
@Injectable({
  providedIn: 'root',
})
export class ToolsApplierColorsService implements ITools {
  readonly id = ToolIdConstants.APPLIER_ID;
  readonly faIcon: IconDefinition = faTint;
  readonly toolName = 'Applicateur de couleur';
  parameters: FormGroup;
  object: ElementRef | undefined;

  constructor(/*private drawingService: DrawingService, private toolsColorService: ToolsColorService*/) { }

  /// À l'appuis d'un clique de souris, on récupère l'objet cliqué et on modifie sa couleur
  onPressed(event: MouseEvent): ElementRef | null {
    // const target = event.target as Element;
    // this.object = this.drawingService.getObject(Number(target.id));
    // if (this.object) {
    //   if (event.button === 0) { // left click so set fill to a color
    //     this.object.primaryColor = { rgb: this.toolsColorService.primaryColor, a: this.toolsColorService.primaryAlpha };
    //   } else {     // right click so set stroke to a color
    //     this.object.secondaryColor = { rgb: this.toolsColorService.secondaryColor, a: this.toolsColorService.secondaryAlpha };
    //   }
    //   return null;
    // } else {
    return null;
    //}
  }

  /// Fonction non utilisé pour cet outil
  onRelease(event: MouseEvent) {
    return null;
  }

  /// Fonction non utilisé pour cet outil
  onMove(event: MouseEvent) {
    return null;
  }
  onKeyUp(event: KeyboardEvent, renderer: Renderer2) {
  }
  onKeyDown(event: KeyboardEvent, renderer: Renderer2) {
  }
}
