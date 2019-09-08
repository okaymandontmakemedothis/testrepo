import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  width: number;
  height: number;

  getWidth(): number {
    return window.innerWidth;
  }
  getHeight(): number {
    return window.innerHeight;
  }

  constructor() {
    this.width = window.innerHeight;
    this.height = window.innerHeight;
  }
}
