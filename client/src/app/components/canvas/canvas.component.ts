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

  constructor(private drawing: DrawingService, private toolsService: ToolsService) { }

  get width(): number { return this.drawing.width; }

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


  onMouseDown(event: MouseEvent) {
    this.toolsService.onPressed(event);
  }

  onMouseUp(event: MouseEvent) {
    this.toolsService.onRelease(event);
  }

  onMouseMove(event: MouseEvent) {
    this.toolsService.onMove(event);
  }
}
