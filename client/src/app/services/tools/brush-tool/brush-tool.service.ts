import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPaintBrush, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/polyline';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { ITexture } from 'src/app/textures/ITexture';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';
import { INITIAL_WIDTH } from '../tools-constants';

/// Service de l'outil pinceau, permet de créer des polyline en svg
/// Il est possible d'ajuster le stroke width et la texture
@Injectable({
  providedIn: 'root',
})
export class BrushToolService implements ITools {
  readonly id = ToolIdConstants.BRUSH_ID;
  readonly faIcon: IconDefinition = faPaintBrush;
  readonly toolName = 'Brush Tool';
  parameters: FormGroup;
  private object: Polyline | null;
  strokeWidth: FormControl;
  texture: FormControl;
  lastPoint: Point = { x: 0, y: 0 };

  constructor(
    private texturesService: TexturesService,
    private offsetManager: OffsetManagerService,
    private colorTool: ToolsColorService,
  ) {
    this.strokeWidth = new FormControl(INITIAL_WIDTH);
    this.texture = new FormControl(this.texturesService.firstTexture.value);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      texture: this.texture,
    });
  }

  /// Ajout d'un point dans la liste de point du Polyline
  private addPoint(dpoint: Point) {
    if (this.object) {
      if (this.lastPoint) {
        this.lastPoint = { x: this.lastPoint.x + dpoint.x, y: this.lastPoint.y + dpoint.y };
      } else {
        this.lastPoint = dpoint;
      }
      this.object.addPoint(this.lastPoint);
    }
  }

  /// Création d'un polyline selon la position de l'evenement de souris, choisi les bonnes couleurs selon le clique de souris
  /// Récupère la bonne texture
  onPressed(event: MouseEvent): IObjects {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.lastPoint = { x: offset.x, y: offset.y };
    const texture: ITexture = this.texturesService.returnTexture(this.texture.value);
    this.object = new Polyline(this.lastPoint, this.strokeWidth.value, texture);
    if (event.button === 0) {
      this.object.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
    } else {
      this.object.primaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
    }
    return this.object;
  }

  /// Réinitialisation de l'outil après avoir laisser le clique de la souris
  onRelease(event: MouseEvent): void {
    this.object = null;
    this.lastPoint = { x: 0, y: 0 };
  }

  /// Ajout d'un point seulon le déplacement de la souris
  onMove(event: MouseEvent): void {
    if (this.object) {
      this.addPoint({ x: event.movementX, y: event.movementY });
    }
  }
}
