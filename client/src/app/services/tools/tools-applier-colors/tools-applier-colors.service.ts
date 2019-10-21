import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { OBJECT_ATTRIBUTE_STRUCTURE } from 'src/app/model/object-structure.model';
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
      const targetName: string | null = target.getAttribute('name');
      if (!targetName) {
        return;
      }
      const propertyMap: Record<string, string> | undefined = OBJECT_ATTRIBUTE_STRUCTURE[targetName];
      if (!propertyMap) {
        return;
      }
      const primaryColorAttribute: string = propertyMap.primaryColor as string;
      const primaryAlphaAttribute: string = propertyMap.primaryOpacity as string;

      const actualValue = target.style.getPropertyValue(primaryColorAttribute);

      if (actualValue.startsWith('url')) {
        this.object = (((document.getElementById(actualValue.replace('url("#', '').replace('")', '')) as HTMLElement)
          .children.item(0) as SVGElement)
          .children.item(0) as SVGElement);
      } else {
        this.object = this.drawingService.getObject(Number(target.id));
      }
      let colorString;
      let alphaString;
      if (event.button === 0) {
        colorString = 'primaryColor';
        alphaString = 'primaryOpacity';
      } else {
        colorString = 'secondaryColor';
        alphaString = 'secondaryOpacity';
      }
      if (this.object) {
        const objectName: string | null = this.object.getAttribute('name');
        const attributeName: string = objectName ? objectName : 'rectangle';
        const property: Record<string, string> | undefined = OBJECT_ATTRIBUTE_STRUCTURE[attributeName];
        if (!property) {
          return;
        }
        const colorAtribute: string | undefined = property[colorString];
        const alphaAtribute: string | undefined = property[alphaString];
        if (!colorAtribute || !alphaAtribute) {
          return;
        }
        this.drawingService.renderer.setStyle(this.object, colorAtribute,
          `rgb(${this.toolsColorService.primaryColor.r},${this.toolsColorService.primaryColor.g},
          ${this.toolsColorService.primaryColor.b})`);
        this.drawingService.renderer.setStyle(this.object, alphaAtribute, `${this.toolsColorService.primaryAlpha}`);
        const markerID: string | null = this.object.getAttribute('marker-mid');
        if (markerID) {
          const markerEl: HTMLElement | null = document.getElementById(
            markerID.replace('url(#', '').replace(')', ''));
          if (markerEl) {
            this.drawingService.renderer.setStyle(markerEl.firstChild, 'fill',
              `rgb(${this.toolsColorService.primaryColor.r},${this.toolsColorService.primaryColor.g},
              ${this.toolsColorService.primaryColor.b})`);
            this.drawingService.renderer.setStyle(markerEl.firstChild, 'fillOpacity', `${this.toolsColorService.primaryAlpha}`);

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
