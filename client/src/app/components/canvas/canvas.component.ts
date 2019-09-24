import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {

  get height(): number { return this.drawing.height; }
  get backgroundColor(): string { return this.drawing.colorString; }
  get backgroundAlpha(): number { return this.drawing.alpha; }

  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor(private drawing: DrawingService, private tools: ToolsService) { }

  get width(): number { return this.drawing.width; }

  isPressed: boolean = false;

  onPressed(event: MouseEvent) {
    this.isPressed = true
    this.tools.onPressed(event);
  }
  onRelease(event: MouseEvent) {
    this.isPressed = false;
    this.tools.onRelease(event);
  }
  onMove(event: MouseEvent) {
    if (this.isPressed)
      this.tools.onMove(event);

    if (event.offsetX <= 0 || event.offsetX > this.width || event.offsetY <= 0 || event.offsetY > this.height)
      this.onRelease(event);
  }

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
