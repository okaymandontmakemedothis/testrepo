import { EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA, RGBA } from 'src/app/model/rgba.model';

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

  objectList: Map<number, SVGElement>;

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

  // toRectangleObject(drawing: any) {
  //   const rectangleObject = new RectangleObject(drawing.x, drawing.y, drawing.strokeWidth, drawing.style);
  //   rectangleObject.id = drawing.objectId;
  //   rectangleObject.height = drawing.height;
  //   rectangleObject.width = drawing.width;
  //   rectangleObject.primaryColor = drawing.primaryRGBA;
  //   rectangleObject.secondaryColor = drawing.secondaryRGBA;
  //   return rectangleObject;
  // }

  // toPolyLineObject(drawingObject: any): Polyline {
  //   const texture = this.textureService.returnTexture(drawingObject.testureId);
  //   const polylineObject = new Polyline(drawingObject.pointsList[0], drawingObject.strokeWidth, texture);
  //   polylineObject.pointsList = drawingObject.pointsList;

  //   polylineObject.id = drawingObject.objectId;
  //   polylineObject.x = drawingObject.x;
  //   polylineObject.y = drawingObject.y;
  //   polylineObject.height = drawingObject.height;
  //   polylineObject.width = drawingObject.width;
  //   polylineObject.primaryColor = drawingObject.primaryRGBA;
  //   polylineObject.secondaryColor = drawingObject.secondaryRGBA;
  //   polylineObject.pointsList = drawingObject.pointsList;

  //   return polylineObject;
  // }
}
