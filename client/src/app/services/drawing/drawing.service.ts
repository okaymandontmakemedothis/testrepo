import { Injectable, Output, EventEmitter } from '@angular/core';
import { RGB } from 'src/app/model/rgb.model';
import { RGBA } from 'src/app/model/rgba.model';
import { IObjects } from 'src/app/objects/IObjects';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  created = false;

  color: RGB = { r: 255, g: 255, b: 255 };
  alpha = 1;
  width = 500;
  height = 500;
  @Output()
  svgString = new EventEmitter<string>();

  private objectList: Map<number, IObjects>;

  constructor() {
    this.objectList = new Map<number, IObjects>();
  }

  removeObject(id: number): boolean {
    return this.objectList.delete(id);
  }

  addObject(obj: IObjects) {
    this.objectList.set(obj.id, obj);
  }

  getObject(id: number) {
    this.objectList.get(id);
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

  get colorString() {
    return 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
  }
}
