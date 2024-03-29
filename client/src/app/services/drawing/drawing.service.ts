import { EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA, RGBA } from 'src/app/model/rgba.model';
import { Drawing } from '../../../../../common/communication/drawing';

/// Service qui contient les fonction pour dessiner a l'écran
@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  @Output()
  drawingEmit = new EventEmitter<SVGElement>();
  id: string;
  saved = false;
  renderer: Renderer2;
  svgString = new EventEmitter<string>();
  lastObjectId = 0;
  isCreated = false;
  color: RGB = DEFAULT_RGB_COLOR;
  alpha: number = DEFAULT_ALPHA;
  width = 0;
  height = 0;
  drawing: SVGElement;

  private objectList: Map<number, SVGElement>;

  constructor() {
    this.objectList = new Map<number, SVGElement>();
  }
  get rgbColorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
  }

  get rgbaColorString() {
    return 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.alpha + ')';
  }

  get isSaved(): boolean {
    return this.saved || !this.isCreated;
  }

  getObjectList(): Map<number, SVGElement> {
    return this.objectList;
  }

  get objects(): Map<number, SVGElement> {
    return this.objectList;
  }
  /// Retrait d'un objet selon son ID
  removeObject(id: number): void {
    this.renderer.removeChild(this.drawing, this.objectList.get(id));
    this.saved = false;
    this.objectList.delete(id);
  }

  /// Ajout d'un objet dans la map d'objet du dessin
  addObject(obj: SVGElement): number {
    this.saved = false;
    this.lastObjectId++;
    this.renderer.setProperty(obj, 'id', this.lastObjectId);
    this.objectList.set(this.lastObjectId, obj);
    this.renderer.insertBefore(this.drawing, obj, this.drawing.lastElementChild);
    return this.lastObjectId;
  }

  /// Récupère un objet selon son id dans la map d'objet
  getObject(id: number): SVGElement | undefined {
    return this.objectList.get(id);
  }

  /// Redéfini la dimension du dessin
  setDimension(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setAttribute(this.drawing, 'width', width.toString());
    this.renderer.setAttribute(this.drawing, 'height', height.toString());
  }

  /// Change la couleur du fond d'écran
  setDrawingColor(rgba: RGBA) {
    this.color = rgba.rgb;
    this.alpha = rgba.a;
  }

  /// Fonction pour appeller la cascade de bonne fonction pour réinitialisé un nouveau dessin
  newDrawing(width: number, height: number, rgba: RGBA) {
    this.saved = false;
    this.objectList.clear();
    this.lastObjectId = 0;
    this.drawing = this.renderer.createElement('svg', 'svg');
    this.setDimension(width, height);
    this.setDrawingColor(rgba);
    this.drawingEmit.emit(this.drawing);
  }

  openDrawing(drawing: Drawing) {
    this.saved = false;
    this.objectList.clear();
    this.id = drawing.id;
    this.lastObjectId = 0;
    this.drawing = this.renderer.createElement('svg', 'svg');
    this.setDimension(drawing.width, drawing.height);
    this.setDrawingColor(drawing.backGroundColor);
    this.drawing.innerHTML = drawing.svg;
    let lastId: number;
    for (let i = 0; i < this.drawing.children.length; i++) {
      lastId = Number((this.drawing.children.item(i) as SVGElement).id);
      this.objectList.set(lastId, this.drawing.children.item(i) as SVGElement);
      if (lastId > this.lastObjectId) {
        this.lastObjectId = lastId;
      }
    }
    this.drawingEmit.emit(this.drawing);
  }
}
