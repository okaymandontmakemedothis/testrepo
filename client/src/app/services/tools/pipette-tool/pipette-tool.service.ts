import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { OBJECT_ATTRIBUTE_STRUCTURE } from 'src/app/model/object-structure.model';
import { RGB } from 'src/app/model/rgb.model';
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
  object: SVGAElement | undefined;

  constructor(private toolsColorService: ToolsColorService, private drawingService: DrawingService) { }

  /// À l'appuis d'un clique de souris, on récupère l'objet cliqué et on modifie sa couleur
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      const target = event.target as SVGElement;
      const targetName: string | null = target.getAttribute('name');
      if (target.tagName.toLowerCase() === 'svg') {
        if (event.button === 0) { // left click so set primary color to color of object
          this.toolsColorService.setPrimaryColor(this.drawingService.color, this.drawingService.alpha);
        } else {     // right click so set secondary color to color of object
          this.toolsColorService.setSecondaryColor(this.drawingService.color, this.drawingService.alpha);
        }
        return;
      }
      if (targetName) {
        const propertyMap: Record<string, string> | undefined = OBJECT_ATTRIBUTE_STRUCTURE[targetName];
        if (!propertyMap) {
          return;
        }
        const primaryColorAttribute: string = propertyMap.primaryColor as string;
        const primaryAlphaAttribute: string = propertyMap.primaryOpacity as string;

        const actualValue = target.style.getPropertyValue(primaryColorAttribute);
        let rgbString: string;
        let alphaString: string;
        if (actualValue.startsWith('url')) {
          const patternElement: HTMLElement = (((document.getElementById
            (actualValue.replace('url("#', '').replace('")', '')) as HTMLElement)
            .children.item(0) as HTMLElement)
            .children.item(0) as HTMLElement);
          rgbString = patternElement.getAttribute('fill') as string;
          alphaString = patternElement.getAttribute('fill-opacity') as string;
        } else {
          rgbString = actualValue;
          alphaString = target.style.getPropertyValue(primaryAlphaAttribute);
        }

        const rgbValue: RegExpMatchArray | null = rgbString.match(/\d+/g);
        if (!rgbValue) {
          return;
        }
        let rgb: RGB;
        let a: number;

        rgb = { r: Number(rgbValue[0]), g: Number(rgbValue[1]), b: Number(rgbValue[2]) };
        a = Number(alphaString);

        if (event.button === 0) { // left click so set primary color to color of object
          this.toolsColorService.setPrimaryColor(rgb, a);
        } else {     // right click so set secondary color to color of object
          this.toolsColorService.setSecondaryColor(rgb, a);
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

  onKeyUp(event: KeyboardEvent): void {
    return;
  }
  onKeyDown(event: KeyboardEvent): void {
    return;
  }
}
