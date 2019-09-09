import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, HostListener, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-color-opacity',
  templateUrl: './color-opacity.component.html',
  styleUrls: ['./color-opacity.component.scss']
})
export class ColorOpacityComponent implements AfterViewInit, OnChanges {

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  hue: { r: number, g: number, b: number };

  @Output()
  opacity: EventEmitter<number> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;
  private isMouseDown = false;
  private selectedWidth: number;


  ngAfterViewInit() {
    this.selectedWidth = this.canvas.nativeElement.width;
    this.draw();
    this.emitOpacity(this.selectedWidth);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hue) {
      this.draw();
    }
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);
    const gradient = this.ctx.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0, 'rgba(' + this.hue.r + ', ' + this.hue.g + ', ' + this.hue.b + ', 0)' || 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(' + this.hue.r + ', ' + this.hue.g + ', ' + this.hue.b + ', 1)' || 'rgba(0,0,0,0)');
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
