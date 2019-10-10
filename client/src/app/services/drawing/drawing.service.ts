import { EventEmitter, Injectable, Output } from '@angular/core';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA, RGBA } from 'src/app/model/rgba.model';
import { IObjects } from 'src/app/objects/IObjects';
import { Polyline } from 'src/app/objects/object-polyline/polyline';
import { RectangleObject } from 'src/app/objects/object-rectangle/rectangle';
import { DrawingObject } from '../../../../../common/communication/drawing';
import { TexturesService } from '../textures/textures.service';

/// Service qui contient les fonction pour dessiner a l'écran
@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  /// Emit the SVG elements string
  @Output()
  svgString = new EventEmitter<string>();
  isSaved = false;
  lastObjectId = 0;
  isCreated = false;
  color: RGB = DEFAULT_RGB_COLOR;
  alpha: number = DEFAULT_ALPHA;
  width = 0;
  height = 0;

  private objectList: Map<number, IObjects>;

  constructor(private textureService: TexturesService ) {
    this.objectList = new Map<number, IObjects>();
  }

  get rgbColorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
  }

  get rgbaColorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.alpha + ')';
  }

  /// Retrait d'un objet selon son ID
  removeObject(id: number): void {
    this.isSaved = false;
    this.objectList.delete(id);
    this.draw();
  }

  /// Rajouter une liste de Drawing Object a la map d'Object
  addDrawingObjectList(objList: DrawingObject[]) {
    for (const drawingObject of objList) {
      switch(drawingObject.type) {
        case 'rectangle':
          console.log('adding rectangle');
          this.addObject(this.toRectangleObject(drawingObject));
        case 'polyline':
          console.log('adding polyline');
          this.addObject(this.polyLine.toPolyLineObject(drawingObject));

      }
    }

  }

  /// Ajout d'un objet dans la map d'objet du dessin
  addObject(obj: IObjects) {
    this.isSaved = false;
    this.lastObjectId++;
    obj.id = this.lastObjectId;
    this.objectList.set(obj.id, obj);
    this.draw();
  }

  /// Récupère un objet selon son id dans la map d'objet
  getObject(id: number): IObjects | undefined {
    return this.objectList.get(id);
  }

  drawString(): string {
    let drawResult = '';
    for (const obj of this.objectList.values()) {
      drawResult += obj.draw();
    }
    return drawResult;
  }

  /// Retourn un string avec tout les éléments svg des objets
  draw() {
    this.isSaved = false;
    this.svgString.emit(this.drawString());
  }

  drawingObjectList(): DrawingObject[] {
    const drawingObjectList: DrawingObject[] = [];
    for (const obj of this.objectList.values()) {
      drawingObjectList.push(obj.toDrawingObject());
    }
    return drawingObjectList;
  }

  /// Redéfini la dimension du dessin
  setDimension(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /// Change la couleur du fond d'écran
  setDrawingColor(rgba: RGBA) {
    this.color = rgba.rgb;
    this.alpha = rgba.a;
  }

  /// Fonction pour appeller la cascade de bonne fonction pour réinitialisé un nouveau dessin
  newDrawing(width: number, height: number, rgba: RGBA) {
    this.isSaved = false;
    this.objectList.clear();
    this.lastObjectId = 0;
    this.setDimension(width, height);
    this.setDrawingColor(rgba);
    this.draw();
  }

  toRectangleObject(drawing: DrawingObject) {
    const rectangleObject= new RectangleObject(drawing.x,drawing.y,drawing.strokeWidth,drawing.style);
    rectangleObject.id=drawing.objectId;
    rectangleObject.height=drawing.height;
    rectangleObject.width=drawing.width;
    rectangleObject.primaryColor=drawing.primaryRGBA;
    rectangleObject.secondaryColor=drawing.secondaryRGBA;
    return rectangleObject;
  }

  toPolyLineObject(drawingObject: DrawingObject): Polyline {
    const texture = this.textureService.returnTexture(drawingObject.testureId);
    const polylineObject = new Polyline(drawingObject.pointsList[0],drawingObject.strokeWidth,texture);
    polylineObject.pointsList=drawingObject.pointsList;

    polylineObject.id=drawingObject.objectId;
    polylineObject.x=drawingObject.x;
    polylineObject.y=drawingObject.y;
    polylineObject.height=drawingObject.height;
    polylineObject.width=drawingObject.width;
    polylineObject.primaryColor=drawingObject.primaryRGBA;
    polylineObject.secondaryColor=drawingObject.secondaryRGBA;
    polylineObject.pointsList=drawingObject.pointsList;
    polylineObject.strokeWidth=drawingObject.strokeWidth;

    return polylineObject;
}
}
