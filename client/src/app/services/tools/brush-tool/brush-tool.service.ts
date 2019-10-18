import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPaintBrush, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Point } from 'src/app/model/point.model';
import { RGB } from 'src/app/model/rgb.model';
import { TexturesService } from 'src/app/services/textures/textures.service';
import { DrawingService } from '../../drawing/drawing.service';
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
  readonly toolName = 'Outil Pinceau';
  parameters: FormGroup;
  private object: SVGPolylineElement | null;
  private strokeWidth: FormControl;
  texture: FormControl;
  private lastPoint: Point;
  dotId = -1;
  private pointsList: Point[] = [];

  constructor(
    private texturesService: TexturesService,
    private offsetManager: OffsetManagerService,
    private colorTool: ToolsColorService,
    private drawingService: DrawingService,
  ) {
    this.strokeWidth = new FormControl(INITIAL_WIDTH);
    this.texture = new FormControl(this.texturesService.firstTexture.value);
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      texture: this.texture,
    });
  }

  /// Ajout d'un point dans la liste de point du Polyline
  private addPoint(point: Point) {
    this.lastPoint = point;
    this.pointsList.push(this.lastPoint);
  }

  /// Création d'un polyline selon la position de l'evenement de souris, choisi les bonnes couleurs selon le clique de souris
  /// Récupère la bonne texture
  onPressed(event: MouseEvent): void {
    if (event.button === 0 || event.button === 2) {
      if (this.strokeWidth.value && this.strokeWidth.value > 0) {
        const polyline: SVGPolylineElement = this.drawingService.renderer.createElement('polyline', 'svg');
        const dot: SVGEllipseElement = this.drawingService.renderer.createElement('ellipse', 'svg');
        const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
        this.lastPoint = { x: offset.x, y: offset.y };
        this.drawingService.renderer.setAttribute(dot, 'cx', this.lastPoint.x.toString());
        this.drawingService.renderer.setAttribute(dot, 'cy', this.lastPoint.y.toString());
        this.drawingService.renderer.setAttribute(dot, 'ry', (this.strokeWidth.value / 2).toString());
        this.drawingService.renderer.setAttribute(dot, 'rx', (this.strokeWidth.value / 2).toString());
        this.drawingService.renderer.setStyle(dot, 'stroke', `none`);

        this.drawingService.renderer.setStyle(polyline, 'stroke-width', this.strokeWidth.value.toString());
        this.drawingService.renderer.setAttribute(polyline, 'points', `${this.lastPoint.x} ${this.lastPoint.y}`);
        this.drawingService.renderer.setStyle(polyline, 'stroke-linecap', `round`);
        this.drawingService.renderer.setStyle(polyline, 'stroke-linejoin', `round`);
        this.drawingService.renderer.setStyle(polyline, 'fill', `none`);
        this.object = polyline;
        this.dotId = this.drawingService.addObject(dot);
        if (event.button === 0) {
          this.setColors(this.colorTool.primaryColor, this.colorTool.primaryAlpha, dot);
        } else {
          this.setColors(this.colorTool.secondaryColor, this.colorTool.secondaryAlpha, dot);
        }
      }
    }
  }

  /// Définir les couleurs des objets
  setColors(rgb: RGB, a: number, dot: SVGElement) {
    const texture: SVGDefsElement | null = this.texturesService.getTextureElement(
      this.texture.value, { rgb, a }, this.lastPoint.x, this.lastPoint.y, this.drawingService.renderer);
    if (texture) {
      this.drawingService.addObject(texture);
      const texturePattern: SVGPatternElement = texture.children.item(0) as SVGPatternElement;
      const textureId: string = texturePattern.id;
      this.drawingService.renderer.setStyle(
        this.object, 'stroke', `url(#${textureId})`);
      this.drawingService.renderer.setStyle(
        dot, 'fill', `url(#${texture.id})`);
    }
  }

  /// Réinitialisation de l'outil après avoir laisser le clique de la souris
  onRelease(event: MouseEvent): void {
    this.object = null;
    this.pointsList = [];
    this.lastPoint = { x: 0, y: 0 };
  }

  /// Ajout d'un point seulon le déplacement de la souris
  onMove(event: MouseEvent): void {
    if (this.object) {
      this.addPoint(this.offsetManager.offsetFromMouseEvent(event));
      let pointString = '';
      for (const point of this.pointsList) {
        pointString += `${point.x} ${point.y},`;
      }
      pointString = pointString.substring(0, pointString.length - 1);
      this.drawingService.renderer.setAttribute(this.object, 'points', pointString);
      if (this.dotId !== -1) {
        this.drawingService.removeObject(this.dotId);
        this.drawingService.addObject(this.object);
        this.dotId = -1;
      }
    }
  }
  onKeyUp(event: KeyboardEvent) {
    return;
  }
  onKeyDown(event: KeyboardEvent) {
    return;
  }
}
