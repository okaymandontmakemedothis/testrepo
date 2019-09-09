import { Component, AfterViewInit, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements AfterViewInit, OnChanges {

  hue: { r: number, g: number, b: number };
  rgb: { r: number, g: number, b: number } = { r: 255, g: 255, b: 255 };
  a = 1;
  color: string;

  private ctx: CanvasRenderingContext2D;

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.draw();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.rgb || changes.hue || changes.a) {
      this.draw();
    }
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.fillStyle = ('rgba(' + this.hue.r + ',' + this.hue.g + ',' + this.hue.b + ',' + this.a.toFixed(2) +
      ')');
    this.ctx.fillRect(0, 0, width, height);
  }
}
