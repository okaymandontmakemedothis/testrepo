<<<<<<< HEAD
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToolsService } from 'src/app/services/tools/tools.service';
=======
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing/drawing.service';
>>>>>>> master

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
<<<<<<< HEAD
export class CanvasComponent implements OnInit {

  constructor(private tools: ToolsService) {}
  isDown = false;

  @ViewChild('dataContainer', {static: false}) dataContainer: ElementRef;

  private objectSVGString = '';
  private objectSVGList: string[] = [];

  onMouseDown($event: MouseEvent) {
    this.isDown = true;
    this.objectSVGList.push(this.tools.toolsList[this.tools.toolSelectedID].onPressed($event));

    this.updateView();
  }

  onMouseUp($event: MouseEvent) {
    this.isDown = false;
    // this.objectList[this.objectList.length-1] = this.tools.toolsList[this.tools.toolSelectedID].onRelease($event);
    this.updateView();
  }

  onMouseMove($event: MouseEvent) {
    // if ($event.offsetX >= 300-5 || $event.offsetY >= 300-5 || $event.offsetX <= 0 || $event.offsetY <= 0)
      // this.isDown = false;

    if (this.isDown) {
      this.objectSVGList[this.objectSVGList.length - 1] = this.tools.toolsList[this.tools.toolSelectedID].onMove($event);
      this.updateView();
    }
  }
  updateView() {
    this.objectSVGString = '';
    this.objectSVGList.forEach((element) => {
      this.objectSVGString += element;
    });
    this.dataContainer.nativeElement.innerHTML = this.objectSVGString;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.objectSVGList.forEach((element) => {
      this.objectSVGString += element;
    });
    this.dataContainer.nativeElement.innerHTML = this.objectSVGString;
=======
export class CanvasComponent implements OnInit, AfterViewInit {

  get height(): number { return this.drawing.height; }
  get backgroundColor(): string { return this.drawing.colorString; }
  get backgroundAlpha(): number { return this.drawing.alpha; }

  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor(private drawing: DrawingService) { }

  get width(): number { return this.drawing.width; }

  get isDrawingCreated(): boolean {
    return this.drawing.created;
  }

  ngOnInit() {
    console.log(this.backgroundColor);
>>>>>>> master
  }

  ngAfterViewInit() {
    this.drawing.svgString.subscribe((svgString: string) => {
      this.svg.nativeElement.innerHTML = svgString;
    });
  }
}
