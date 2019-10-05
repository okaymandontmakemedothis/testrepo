import { AfterViewInit, Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
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

  rect: ElementRef;

  constructor(private drawingService: DrawingService, private renderer: Renderer2) {
    this.drawingService.renderer = this.renderer;
  }

  /// À l'initialisation, le canvas s'abonne au service de dessin pour reçevoir en string le svg
  ngAfterViewInit() {

    this.drawingService.svgString.subscribe((svgString: string) => {
      // this.svg.
    });

    this.drawingService.objEmit.subscribe((el: ElementRef) => {
      this.renderer.appendChild(this.svg.nativeElement, el);
    });
  }

  test() {
    // const svg = this.renderer.createElement('svg', 'svg')
    this.rect = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(this.rect, 'x', '50');
    this.renderer.setAttribute(this.rect, 'y', '50');
    this.renderer.setAttribute(this.rect, 'width', '50');
    this.renderer.setAttribute(this.rect, 'height', '50');
    this.renderer.setAttribute(this.rect, 'fill', 'black');
    console.log(this.rect);
    this.renderer.appendChild(this.svg.nativeElement, this.rect);
  }

  test2() {
    this.renderer.setAttribute(this.rect, 'fill', 'yellow');
    this.renderer.setAttribute(this.rect, 'height', '100');
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
