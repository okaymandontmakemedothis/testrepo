import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
})
export class ColorSliderComponent implements AfterViewInit {

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  @Output()
  color: EventEmitter<{ r: number, g: number, b: number }> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;
  private isMouseDown = false;
  private selectedHeight = 0;


  ngAfterViewInit() {
    this.selectedHeight = this.canvas.nativeElement.height / 2;
    this.draw();
    this.emitColor(this.selectedHeight);
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.selectedHeight) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 3;
      this.ctx.rect(0, this.selectedHeight - 3, width, 3 * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  emitColor(y: number) {
    const rgbaColor = this.getColorAtPosition(this.canvas.nativeElement.width / 2, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return { r: imageData[0], g: imageData[1], b: imageData[2] };
  }

  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.selectedHeight = event.offsetY;
      this.draw();
      this.emitColor(event.offsetY);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.selectedHeight = event.offsetY;
    this.draw();
    this.emitColor(event.offsetY);

  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.isMouseDown = false;
  }
}
