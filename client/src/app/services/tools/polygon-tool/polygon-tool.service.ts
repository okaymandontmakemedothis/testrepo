import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faDrawPolygon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PolygoneObject } from 'src/app/objects/object-polygone/polygone';
import { DrawingService } from '../../drawing/drawing.service';
import { OffsetManagerService } from '../../offset-manager/offset-manager.service';
import { ToolsColorService } from '../../tools-color/tools-color.service';
import { ITools } from '../ITools';
import { ToolIdConstants } from '../tool-id-constants';

@Injectable({
  providedIn: 'root',
})
export class PolygonToolService implements ITools {

  readonly toolName = 'Outil Polygon';
  readonly faIcon: IconDefinition = faDrawPolygon;
  readonly id = ToolIdConstants.POLYGONE_ID;

  private object: PolygoneObject | null;

  parameters: FormGroup;
  private strokeWidth: FormControl;
  private polygonStyle: FormControl;
  private vertexNumber: FormControl;

  oldX = 0;
  oldY = 0;
  firstX: number;
  firstY: number;

  constructor(private drawingService: DrawingService, private offsetManager: OffsetManagerService, private colorTool: ToolsColorService) {
    this.strokeWidth = new FormControl(1, Validators.min(1));
    this.polygonStyle = new FormControl('fill');
    this.vertexNumber = new FormControl(3, Validators.min(3));
    this.parameters = new FormGroup({
      strokeWidth: this.strokeWidth,
      rectStyle: this.polygonStyle,
      vertexNumber: this.vertexNumber,
    });
    this.registerEventListener();
  }

  private registerEventListener() {
    window.addEventListener('keydown', (event) => {
      if (this.object) {
        this.drawingService.draw();
      }
    });
  }

  /// Quand le bouton de la souris est enfoncé, on crée un polygone regulier et convex.
  /// On le retourne en sortie et il est inséré dans l'objet courant de l'outil.
  onPressed(event: MouseEvent): import("../../../objects/IObjects").IObjects | null {
    const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
    this.firstX = offset.x;
    this.firstY = offset.y;
    this.object = new PolygoneObject(offset.x, offset.y, this.vertexNumber.value, this.strokeWidth.value , this.polygonStyle.value);
    if (event.button === 0) {
      this.object.primaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
    } else {
      this.object.primaryColor = { rgb: this.colorTool.secondaryColor, a: this.colorTool.secondaryAlpha };
      this.object.secondaryColor = { rgb: this.colorTool.primaryColor, a: this.colorTool.primaryAlpha };
    }
    return this.object;
  }

  /// Quand le bouton de la sourie est relaché, il n'existe plus d'objet courrant de l'outil.
  onRelease(event: MouseEvent): void {
    this.object = null;
  }

  /// Transforme le size de l'objet courant avec un x et un y en entrée
  onMove(event: MouseEvent): void {
    if (this.object) {
      const offset: { x: number, y: number } = this.offsetManager.offsetFromMouseEvent(event);
      this.setSize(offset.x, offset.y);
    }
  }

  private setSize(x: number, y: number): void {
    if (this.object) {
      this.oldX = x;
      this.oldY = y;

      this.object.width = x - this.firstX;
      this.object.height = y - this.firstY;

      if (this.object.width < 0) {
        this.object.x = x;
        this.object.width = this.firstX - this.object.x;
      }
      if (this.object.height < 0) {
        this.object.y = y;
        this.object.height = this.firstY - this.object.y;
      }

      if (y < this.firstY && x < this.firstX) {
          if (this.object.width < this.object.height) {
            this.object.height = this.object.width;
            this.object.y = this.firstY - this.object.width;
          } else {
            this.object.width = this.object.height;
            this.object.x = this.firstX - this.object.height;
          }
        } else if (this.object.width < this.object.height) {
          this.object.height = this.object.width;
          if (y < this.firstY) {
            this.object.y = this.firstX + this.firstY - x;
          }
        } else {
          this.object.width = this.object.height;
          if (x < this.firstX) {
            this.object.x = this.firstX + this.firstY - y;
          }
        }
      }
    }
}
