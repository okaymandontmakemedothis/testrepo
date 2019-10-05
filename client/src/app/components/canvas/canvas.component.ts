import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';

/// S'occuppe d'afficher le svg dans un component
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor(private drawingService: DrawingService) { }

  /// À l'initialisation, le canvas s'abonne au service de dessin pour reçevoir en string le svg
  ngAfterViewInit() {
    this.drawingService.svgString.subscribe((svgString: string) => {
      this.svg.nativeElement.innerHTML = svgString;
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
