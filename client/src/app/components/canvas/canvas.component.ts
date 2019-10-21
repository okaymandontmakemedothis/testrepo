import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';

/// S'occuppe d'afficher le svg dans un component
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('svgCanvas', { static: false })
  canvasDiv: ElementRef;

  svg: SVGElement;

  constructor(private drawingService: DrawingService, private renderer: Renderer2) {
    this.drawingService.renderer = this.renderer;
  }

  /// À l'initialisation, le canvas s'abonne au service de dessin pour reçevoir en string le svg
  ngAfterViewInit() {
    this.drawingService.drawingEmit.subscribe((el: SVGElement) => {
      console.log('allo');
      if (this.svg) {
        this.renderer.removeChild(this.canvasDiv.nativeElement, this.svg);
      }
      this.svg = el;
      this.renderer.appendChild(this.canvasDiv.nativeElement, this.svg);
    });
  }

  get height(): number {
    if (this.drawingService.isCreated) {
      return this.drawingService.height;
    } else {
      return 0;
    }
  }

  get width(): number {
    if (this.drawingService.isCreated) {
      return this.drawingService.width;
    } else {
      return 0;
    }
  }

  get backgroundColor(): string {
    return this.drawingService.rgbaColorString;
  }

  get backgroundAlpha(): number {
    return this.drawingService.alpha;
  }

  get isDrawingCreated(): boolean {
    return this.drawingService.isCreated;
  }

}
