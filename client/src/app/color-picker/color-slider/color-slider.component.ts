import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
})
export class ColorSliderComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  hue: FormControl;

  private ctx: CanvasRenderingContext2D;
  private isMouseDown = false;
  private selectedHeight = 0;

  constructor(private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.hue = this.colorPickerService.hsl.get('h') as FormControl;
    this.hue.valueChanges.subscribe((value) => {
      this.selectedHeight = value / 360 * this.canvas.nativeElement.height;
      this.draw();
    });
  }

  ngAfterViewInit(): void {
    this.selectedHeight = this.canvas.nativeElement.height / 2;
    this.draw();
  }

  draw(): void {
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

  getHueAtPosition(y: number): number {
    if (y > this.canvas.nativeElement.height) {
      y = this.canvas.nativeElement.height;
    }
    if (y < 0) {
      y = 0;
    }
    const heightPercentage = y / this.canvas.nativeElement.height;
    return 360 * heightPercentage;
  }

  updateHue(y: number): void {
    this.selectedHeight = y;
    const h = this.getHueAtPosition(y);
    this.hue.setValue(h);
    this.draw();
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      this.updateHue(event.offsetY);
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.updateHue(event.offsetY);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent): void {
    this.isMouseDown = false;
  }
}
