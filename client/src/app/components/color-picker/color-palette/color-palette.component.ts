import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  @Input()
  hue: { r: number, g: number, b: number };

  @Input()
  opacity: string;

  @Output()
  color: EventEmitter<{ r: number, g: number, b: number }> = new EventEmitter(true);

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private selectedPosition: { x: number; y: number } = { x: 0, y: 0 };
  private isMouseDown = false;

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hue || changes.opacity) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y));
      }
    }
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.fillStyle = 'rgba(' + this.hue.r + ',' + this.hue.g + ',' + this.hue.b + ',1)' || 'rgba(255,255,255,1)';
    this.ctx.fillRect(0, 0, width, height);

    const whiteGradient = this.ctx.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = whiteGradient;
    this.ctx.fillRect(0, 0, width, height);

    const blackGradient = this.ctx.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = blackGradient;
    this.ctx.fillRect(0, 0, width, height);

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(
        this.selectedPosition.x,
        this.selectedPosition.y,
        6,
        0,
        2 * Math.PI,
      );
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }

  }

  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.selectedPosition = { x: event.offsetX, y: event.offsetY };
      this.draw();
      this.emitColor(event.offsetX, event.offsetY);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.selectedPosition = { x: event.offsetX, y: event.offsetY };
    this.draw();
    this.color.emit(this.getColorAtPosition(event.offsetX, event.offsetY));

  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.isMouseDown = false;
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return { r: imageData[0], g: imageData[1], b: imageData[2] };
  }

}
