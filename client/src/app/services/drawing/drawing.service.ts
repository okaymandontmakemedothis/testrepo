import { EventEmitter, Injectable, Output } from '@angular/core';
import { DEFAULT_RGB_COLOR, RGB } from 'src/app/model/rgb.model';
import { DEFAULT_ALPHA, RGBA } from 'src/app/model/rgba.model';
import { IObjects } from 'src/app/objects/IObjects';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  @Output()
  svgString = new EventEmitter<string>();

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

  removeObject(id: number): void {
    this.objectList.delete(id);
    this.draw();
  }

  addObject(obj: IObjects) {
    this.lastObjectId++;
    obj.id = this.lastObjectId;
    this.objectList.set(obj.id, obj);
    this.draw();
  }

  getObject(id: number): IObjects | undefined {
    return this.objectList.get(id);
  }

  draw() {
    let drawResult = '';
    for (const obj of this.objectList.values()) {
      drawResult += obj.draw();
    }
    this.svgString.emit(drawResult);
  }

  setDimension(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setDrawingColor(rgba: RGBA) {
    this.color = rgba.rgb;
    this.alpha = rgba.a;
  }

  newDrawing(width: number, height: number, rgba: RGBA) {
    this.objectList.clear();
    this.setDimension(width, height);
    this.setDrawingColor(rgba);
    this.draw();
  }

  get rgbColorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
  }

  get rgbaColorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.alpha + ')';
  }
}
