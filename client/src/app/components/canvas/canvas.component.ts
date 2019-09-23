import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
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
  }

}
