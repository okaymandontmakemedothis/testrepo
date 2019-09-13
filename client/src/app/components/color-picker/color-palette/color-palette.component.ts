import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener,
  Input, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  @Input()
  hue: number;

  @Input()
  opacity: string;

  @Output()
  color: EventEmitter<{ h: number, s: number, l: number }> = new EventEmitter(true);

  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private selectedPosition: { x: number; y: number } = { x: 0, y: 0 };
  private isMouseDown = false;

  private hueToRGB(hue: number): { r: number, g: number, b: number } {
    while (hue > 360) {
      hue -= 360;
    }
    const x = 1 - Math.abs((hue / 60) % 2 - 1);
    const c = 1;
    let rgb = { r: 255, g: 255, b: 255 };
    if (0 <= hue && hue < 60) {
      rgb = { r: c, g: x, b: 0 };
    } else if (60 <= hue && hue < 120) {
      rgb = { r: x, g: c, b: 0 };
    } else if (120 <= hue && hue < 180) {
      rgb = { r: 0, g: c, b: x };
    } else if (180 <= hue && hue < 240) {
      rgb = { r: 0, g: x, b: c };
    } else if (240 <= hue && hue < 300) {
      rgb = { r: x, g: 0, b: c };
    } else if (300 <= hue && hue < 360) {
      rgb = { r: c, g: 0, b: x };
    }
    rgb.r = Math.round(rgb.r * 255); rgb.g = Math.round(rgb.g * 255); rgb.b = Math.round(rgb.b * 255);
    return rgb;
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.canvas) {
      if (changes.hue || changes.opacity) {
        this.draw();
        const pos = this.selectedPosition;
        if (pos) {
          this.color.emit(this.getSaturationAndValueAtPosition(pos.x, pos.y));
        }
      }
    }
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    const rbg = this.hueToRGB(this.hue);
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
    this.color.emit(this.getSaturationAndValueAtPosition(event.offsetX, event.offsetY));

  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.isMouseDown = false;
  }

  emitColor(x: number, y: number) {
    const svColor = this.getSaturationAndValueAtPosition(x, y);
    this.color.emit(svColor);
  }

  getSaturationAndValueAtPosition(x: number, y: number): { h: number, s: number, l: number } {
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
    const xPercentage = x / this.canvas.nativeElement.width;
    const yPercentage = y / this.canvas.nativeElement.height;
    return { h: this.hue, s: xPercentage, l: yPercentage };
  }

}
