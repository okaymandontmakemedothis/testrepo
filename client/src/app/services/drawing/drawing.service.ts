import { EventEmitter, Injectable, Output, Renderer2, ElementRef } from '@angular/core';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA, RGBA } from 'src/app/model/rgba.model';
import { IObjects } from 'src/app/objects/IObjects';

/// Service qui contient les fonction pour dessiner a l'écran
@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  /// Emit the SVG elements string
  @Output()
  svgString = new EventEmitter<string>();

  @Output()
  objEmit = new EventEmitter<ElementRef>();

  renderer: Renderer2;
  lastObjectId = 0;
  isCreated = false;
  color: RGB = DEFAULT_RGB_COLOR;
  alpha: number = DEFAULT_ALPHA;
  width = 0;
  height = 0;

  private objectList: Map<number, IObjects>;

  constructor() {
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
    this.objectList.delete(id);
    this.draw();
  }

  /// Ajout d'un objet dans la map d'objet du dessin
  addObject(obj: IObjects) {
    this.lastObjectId++;
    obj.id = this.lastObjectId;
    this.objectList.set(obj.id, obj);
  }

  /// Récupère un objet selon son id dans la map d'objet
  getObject(id: number): IObjects | undefined {
    return this.objectList.get(id);
  }

  /// Retourn un string avec tout les éléments svg des objets
  draw() {
    let drawResult = '';
    for (const obj of this.objectList.values()) {
      drawResult += obj.draw();
      if (obj.objRef) {
        this.objEmit.emit(obj.objRef);
      }
    }
    this.svgString.emit(drawResult);
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
    this.objectList.clear();
    this.lastObjectId = 0;
    this.setDimension(width, height);
    this.setDrawingColor(rgba);
    this.draw();
  }
}
