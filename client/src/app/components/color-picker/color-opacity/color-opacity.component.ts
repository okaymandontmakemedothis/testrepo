import {
  AfterViewInit, Component, ElementRef, HostListener,
  Input, OnInit, ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorTransformer } from 'src/app/color-transformer';

@Component({
  selector: 'app-color-opacity',
  templateUrl: './color-opacity.component.html',
  styleUrls: ['./color-opacity.component.scss'],
})
export class ColorOpacityComponent implements AfterViewInit, OnInit {

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  hsl: FormGroup;

  @Input()
  a: FormControl;

  private ctx: CanvasRenderingContext2D;
  private isMouseDown = false;
  private selectedWidth: number;

  ngOnInit(): void {
    this.hsl.valueChanges.subscribe((value) => this.draw());
    this.a.valueChanges.subscribe((value) => {
      this.selectedWidth = this.canvas.nativeElement.width * this.a.value;
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.selectedWidth = this.canvas.nativeElement.width;
    this.draw();
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

    const gradient = this.ctx.createLinearGradient(0, 0, width, 0);
    const rgb = ColorTransformer.hsl2rgb({
      h: (this.hsl.get('h') as FormControl).value,
      s: (this.hsl.get('s') as FormControl).value,
      l: (this.hsl.get('l') as FormControl).value,
    });

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

  updateOpacity(y: number) {
    const opacityValue = this.getOpacityAtPosition(y);
    this.a.setValue(opacityValue);
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
      this.updateOpacity(event.offsetX);
      this.draw();
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.selectedWidth = event.offsetX;
    this.updateOpacity(event.offsetX);
    this.draw();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.isMouseDown = false;
  }
}
