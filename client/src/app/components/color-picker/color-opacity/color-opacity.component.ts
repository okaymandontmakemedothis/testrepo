import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener,
  Input, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-color-opacity',
  templateUrl: './color-opacity.component.html',
  styleUrls: ['./color-opacity.component.scss'],
})
export class ColorOpacityComponent implements AfterViewInit, OnChanges {

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  hsl: { h: number, s: number, l: number } = { h: 180, s: 1, l: 1 };

  @Output()
  opacity: EventEmitter<number> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;
  private isMouseDown = false;
  private selectedWidth: number;

  private hslToRGB(hsl: { h: number, s: number, l: number }): { r: number, g: number, b: number } {
    while (hsl.h >= 360) {
      hsl.h -= 360;
    }
    const h = hsl.h / 360;
    const q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
    const p = 2 * hsl.l - q;

    return {
      r: Math.round(this.hueToRGB(p, q, h + 1 / 3) * 255), g: Math.round(this.hueToRGB(p, q, h) * 255),
      b: Math.round((this.hueToRGB(p, q, h - 1 / 3) * 255)),
    };

  }

  private hueToRGB(p: number, q: number, t: number): number {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1 / 6) { return p + (q - p) * 6 * t; }
    if (t < 1 / 2) { return q; }
    if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
    return p;
  }

  ngAfterViewInit() {
    this.selectedWidth = this.canvas.nativeElement.width;
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.canvas) {
      if (changes.hsl) {
        this.draw();
      }
    }
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);
    const squareSize = height / 6;
    for (let dx = 0; dx <= width; dx += squareSize * 2) {
      for (let dy = 0; dy <= height; dy += squareSize * 2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#AAAAAA';
        this.ctx.rect(dx, dy, squareSize, squareSize);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
    for (let dx = squareSize; dx <= width; dx += squareSize * 2) {
      for (let dy = squareSize; dy <= height; dy += squareSize * 2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#AAAAAA';
        this.ctx.rect(dx, dy, squareSize, squareSize);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
    const rgb = this.hslToRGB(this.hsl);
    const gradient = this.ctx.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0)' || 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)' || 'rgba(0,0,0,0)');
    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.selectedWidth) {
      this.ctx.beginPath();
      const perc = (1 - (this.selectedWidth / width));
      const colorValue = (255 - Math.floor(255 * perc * 0.9));
      this.ctx.strokeStyle = 'rgba(' + colorValue + ', ' + colorValue + ',' + colorValue + ', 1) ';
      this.ctx.lineWidth = 3;
      this.ctx.rect(this.selectedWidth - 3, 0, 3 * 2, height);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  emitOpacity(y: number) {
    const opacityValue = this.getOpacityAtPosition(y);
    this.opacity.emit(opacityValue);
  }

  getOpacityAtPosition(x: number) {
    if (x > this.canvas.nativeElement.width) {
      x = this.canvas.nativeElement.width;
    }
    if (x < 0) {
      x = 0;
    }
    const percentage = x / this.canvas.nativeElement.width;
    return percentage;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.selectedWidth = event.offsetX;
      this.draw();
      this.emitOpacity(event.offsetX);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.selectedWidth = event.offsetX;
    this.draw();
    this.emitOpacity(event.offsetX);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.isMouseDown = false;
  }
}
