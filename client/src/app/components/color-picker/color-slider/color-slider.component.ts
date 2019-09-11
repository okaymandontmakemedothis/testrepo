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
  color: EventEmitter<number> = new EventEmitter();

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
    gradient.addColorStop(0.66, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.84, 'rgba(255, 0, 255, 1)');
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
    const hue = this.getHueAtPosition(y);
    this.color.emit(hue);
  }

  getHueAtPosition(y: number) {
    if (y > this.canvas.nativeElement.height) {
      y = this.canvas.nativeElement.height;
    }
    if (y < 0) {
      y = 0;
    }
    const heightPercentage = y / this.canvas.nativeElement.height;
    return 360 * heightPercentage;
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
