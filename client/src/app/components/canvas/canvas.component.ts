import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {

  get height(): number {
    if (this.drawing.created) {
      return this.drawing.height;
    } else {
      return 0;
    }
  }
  get width(): number {
    if (this.drawing.created) {
      return this.drawing.width;
    } else {
      return 0;
    }
  }
  get backgroundColor(): string { return this.drawing.rgbaColorString; }
  get backgroundAlpha(): number { return this.drawing.alpha; }

  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor(private drawing: DrawingService) { }

  isPressed = false;


  get isDrawingCreated(): boolean {
    return this.drawing.created;
  }

  ngAfterViewInit() {
    this.drawing.svgString.subscribe((svgString: string) => {
      this.svg.nativeElement.innerHTML = svgString;
    });
  }

}
