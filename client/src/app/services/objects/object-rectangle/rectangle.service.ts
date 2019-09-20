import { Injectable } from '@angular/core';
import { IObjects } from '../IObjects';
import { IShapes } from '../IShapes';

@Injectable({
  providedIn: 'root'
})
export class RectangleService implements IObjects, IShapes{
  id:number = 1;

  svgLine:string = '<rect x="[x]" y="[y]" width="[width]" height="[height]" style="fill:rgb([r],[g],[b]);stroke-width:[strokeWidth];stroke:rgb([r],[g],[b])" />';

  x: number;
  y: number;
  height: number;
  width: number;

  strokeWidth:number;

  r:number;
  g:number;
  b:number;

  draw(): void {
    throw new Error("Method not implemented.");
  }

  getColor(): void {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
