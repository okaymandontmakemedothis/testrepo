import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { ObjectAtributeStructure } from 'src/app/model/object-structure.model';
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

  constructor(private drawingService: DrawingService, private toolsColorService: ToolsColorService) { }

  /// À l'appuis d'un clique de souris, on récupère l'objet cliqué et on modifie sa couleur
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      console.log(event);
      const target = event.target as SVGElement;
      const propertyMap = ObjectAtributeStructure[target.tagName.toLowerCase()];
      let property = propertyMap ? propertyMap.primaryColor : '';

      const fill = (target.style.getPropertyValue(property as string)).replace(/[^0-9]/g, ',').split(',').filter((el) => el !== '');

      property = propertyMap ? propertyMap.primaryOpacity : '';
      const opacity = target.style.getPropertyValue(property as string);

      let rgb: RGB;
      let a: number;

      if (fill.length === 0) {
        rgb = this.drawingService.color;
        a = this.drawingService.alpha;
      } else {
        rgb = { r: Number(fill[0]), g: Number(fill[1]), b: Number(fill[2]) };
        a = Number(opacity);
      }

      if (event.button === 0) { // left click so set primary color to color of object
        this.toolsColorService.setPrimaryColor(rgb, a);
      } else {     // right click so set secondary color to color of object
        this.toolsColorService.setSecondaryColor(rgb, a);
      }
    }
  }

  /// Fonction non utilisé pour cet outil
  // tslint:disable-next-line: no-empty
  onRelease(event: MouseEvent) { }

  /// Fonction non utilisé pour cet outil
  // tslint:disable-next-line: no-empty
  onMove(event: MouseEvent) { }

  /// Fonction non utilisé pour cet outil
  // tslint:disable-next-line: no-empty
  onKeyUp(event: KeyboardEvent): void { }

  /// Fonction non utilisé pour cet outil
  // tslint:disable-next-line: no-empty
  onKeyDown(event: KeyboardEvent): void { }
}
