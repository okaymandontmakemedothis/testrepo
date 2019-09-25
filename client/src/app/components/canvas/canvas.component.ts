import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {

  get height(): number { return this.drawing.height; }
  get width(): number {
    return this.drawing.width;
  }
  get backgroundColor(): string { return this.drawing.rgbaColorString; }
  get backgroundAlpha(): number { return this.drawing.alpha; }

  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor(private drawing: DrawingService) { }


  get isDrawingCreated(): boolean {
    return this.drawing.created;
  }

  ngOnInit() {
    console.log(this.backgroundColor);
  }

  ngAfterViewInit() {
    this.drawing.svgString.subscribe((svgString: string) => {
      this.svg.nativeElement.innerHTML = svgString;
    });
  }

}
