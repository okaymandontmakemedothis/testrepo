import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { ObjectAtributeStructure } from 'src/app/model/object-structure.model';
import { RGB } from 'src/app/model/rgb.model';
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
  object: SVGElement | undefined;

  constructor(private drawingService: DrawingService, private toolsColorService: ToolsColorService) { }

  /// À l'appuis d'un clique de souris, on récupère l'objet cliqué et on modifie sa couleur
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      const target = event.target as SVGElement;
      this.object = this.drawingService.getObject(Number(target.id));

      const propertyMap = ObjectAtributeStructure[target.tagName];
      let property: string;

      if (this.object) {
        property = propertyMap ? propertyMap.primaryColor : '';
        if (event.button === 0 && target.style.getPropertyValue(property) !== 'none') { // left click so set fill to a color
          this.setColors(this.toolsColorService.primaryColor, property);
          // this.drawingService.renderer.setStyle(this.object, property,
          //   `rgb(${this.toolsColorService.primaryColor.r},${this.toolsColorService.primaryColor.g},
          // ${this.toolsColorService.primaryColor.b})`);

          property = propertyMap ? propertyMap.primaryOpacity : '';
          this.setOpacity(this.toolsColorService.primaryAlpha, property);
          // this.drawingService.renderer.setStyle(this.object, property, `${this.toolsColorService.primaryAlpha}`);
        } else {
          property = propertyMap ? propertyMap.secondaryColor : '';
          if (event.button === 2 && target.style.getPropertyValue(property) !== '') {     // right click so set stroke to a color
            this.setColors(this.toolsColorService.secondaryColor, property);
            // this.drawingService.renderer.setStyle(this.object, property,
            //   `rgb(${this.toolsColorService.secondaryColor.r},${this.toolsColorService.secondaryColor.g},
            // ${this.toolsColorService.secondaryColor.b})`);

            property = propertyMap ? propertyMap.secondaryOpacity : '';
            this.setOpacity(this.toolsColorService.secondaryAlpha, property);

            // this.drawingService.renderer.setStyle(this.object, property, `${this.toolsColorService.secondaryAlpha}`);
          }
        }
      }
    }
  }

  setColors(rgb: RGB, property: string) {
    this.drawingService.renderer.setStyle(
      this.object, property, `rgb(${rgb.r}, ${rgb.g},
        ${ rgb.b})`);
  }

  setOpacity(a: number, property: string) {
    this.drawingService.renderer.setStyle(this.object, 'property', a.toString());
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
