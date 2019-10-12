import { ElementRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { ObjectAtributeStructure } from 'src/app/model/object-structure.model';
import { DrawingService } from '../../drawing/drawing.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
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

  constructor(private drawingService: DrawingService, private toolsColorService: ToolsColorService) { }

  /// À l'appuis d'un clique de souris, on récupère l'objet cliqué et on modifie sa couleur
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      const target = event.target as SVGElement;
      this.object = this.drawingService.getObject(Number(target.id));

      const propertyMap = ObjectAtributeStructure.get(target.tagName);
      let property: string;

      if (this.object) {
        if (event.button === 0) { // left click so set fill to a color
          property = propertyMap ? propertyMap.get('primaryColor') as string : '';
          this.drawingService.renderer.setStyle(this.object, property,
            `rgb(${this.toolsColorService.primaryColor.r},${this.toolsColorService.primaryColor.g},
          ${this.toolsColorService.primaryColor.b})`);

          property = propertyMap ? propertyMap.get('primaryOpacity') as string : '';
          this.drawingService.renderer.setStyle(this.object, property, `${this.toolsColorService.primaryAlpha}`);
        } else {     // right click so set stroke to a color
          property = propertyMap ? propertyMap.get('secondaryColor') as string : '';
          this.drawingService.renderer.setStyle(this.object, 'stroke',
            `rgb(${this.toolsColorService.secondaryColor.r},${this.toolsColorService.secondaryColor.g},
            ${this.toolsColorService.secondaryColor.b})`);

          property = propertyMap ? propertyMap.get('secondaryOpacity') as string : '';
          this.drawingService.renderer.setStyle(this.object, 'strokeOpacity', `${this.toolsColorService.secondaryAlpha}`);
        }
      }
    }
  }

  /// Fonction non utilisé pour cet outil
  onRelease(event: MouseEvent) {
    return;
  }

  /// Fonction non utilisé pour cet outil
  onMove(event: MouseEvent) {
    return;
  }
  onKeyUp(event: KeyboardEvent) {
    return;
  }
  onKeyDown(event: KeyboardEvent) {
    return;
  }
}
