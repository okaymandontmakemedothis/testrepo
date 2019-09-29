import {
  AfterViewInit, Component, ElementRef, HostListener,
  OnInit, ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColorPickerService } from 'src/app/color-picker/color-picker.service';
import { ColorTransformerService } from 'src/app/services/color-transformer/color-transformer.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnInit {

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private selectedPosition: { x: number; y: number };
  private isMouseDown = false;

  constructor(private colorTransformer: ColorTransformerService, private colorPickerService: ColorPickerService) { }

  ngOnInit(): void {
    this.colorPickerService.hsl.valueChanges.subscribe((value) => { this.draw(); });
  }

  get h(): FormControl {
    return this.colorPickerService.hsl.get('h') as FormControl;
  }

  get s(): FormControl {
    return this.colorPickerService.hsl.get('s') as FormControl;
  }

  get l(): FormControl {
    return this.colorPickerService.hsl.get('l') as FormControl;
  }

  ngAfterViewInit(): void {
    this.selectedPosition = { x: this.canvas.nativeElement.width, y: this.canvas.nativeElement.height };
    this.draw();
  }

  /// Cette section de code est inspiré de : https://malcoded.com/posts/angular-color-picker/
  draw(): void {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    const rbg = this.colorTransformer.hue2rgb(this.h.value);
    this.ctx.fillStyle = 'rgba(' + rbg.r + ',' + rbg.g + ',' + rbg.b + ',1)' || 'rgba(255,255,255,1)';
    this.ctx.fillRect(0, 0, width, height);

    const greyGradient = this.ctx.createLinearGradient(0, 0, width, 0);
    greyGradient.addColorStop(0, 'rgba(128,128,128,1)');
    greyGradient.addColorStop(1, 'rgba(128,128,128,0)');

    this.ctx.fillStyle = greyGradient;
    this.ctx.fillRect(0, 0, width, height);

    const whiteGradient = this.ctx.createLinearGradient(0, 0, 0, height / 2);
    whiteGradient.addColorStop(1, 'rgba(0,0,0,0)');
    whiteGradient.addColorStop(0, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = whiteGradient;
    this.ctx.fillRect(0, 0, width, height);

    const blackGradient = this.ctx.createLinearGradient(0, height / 2, 0, height);
    blackGradient.addColorStop(1, 'rgba(255,255,255,1)');
    blackGradient.addColorStop(0, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = blackGradient;
    this.ctx.fillRect(0, 0, width, height);

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(
        this.s.value * this.canvas.nativeElement.width,
        this.l.value * this.canvas.nativeElement.height,
        6,
        0,
        2 * Math.PI,
      );
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }

  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      this.updateSL(event.offsetX, event.offsetY);
      this.draw();
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.updateSL(event.offsetX, event.offsetY);
    this.draw();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent): void {
    this.isMouseDown = false;
  }

  updateSL(x: number, y: number): void {
    const slColor = this.getSaturationAndValueAtPosition(x, y);
    this.s.setValue(slColor.s);
    this.l.setValue(slColor.l);
  }

  getSaturationAndValueAtPosition(x: number, y: number): { s: number, l: number } {
    if (x > this.canvas.nativeElement.width) {
      x = this.canvas.nativeElement.width;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > this.canvas.nativeElement.height) {
      y = this.canvas.nativeElement.height;
    }
    if (y < 0) {
      y = 0;
    }
    const s = x / this.canvas.nativeElement.width;
    const l = y / this.canvas.nativeElement.height;
    return { s, l };
  }

}
