import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ToolsListService } from 'src/app/services/tools/tools-list.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private tools:ToolsListService) {}
  isDown:boolean = false;

  onMouseDown($event:MouseEvent){
    this.isDown = true;
    this.objectSVGList.push(this.tools.toolsList[this.tools.toolSelectedID].onPressed($event));

    this.updateView();
  }

  onMouseUp($event:MouseEvent){
    this.isDown = false;
    //this.objectList[this.objectList.length-1] = this.tools.toolsList[this.tools.toolSelectedID].onRelease($event);
    this.updateView();
  }

  onMouseMove($event:MouseEvent){
    //if ($event.offsetX >= 300-5 || $event.offsetY >= 300-5 || $event.offsetX <= 0 || $event.offsetY <= 0)
      //this.isDown = false;

    if(this.isDown){
      this.objectSVGList[this.objectSVGList.length-1] = this.tools.toolsList[this.tools.toolSelectedID].onMove($event);
      this.updateView();
    }
  }

  @ViewChild('dataContainer',{static:false}) dataContainer: ElementRef;
  updateView(){
    this.objectSVGString = "";
    this.objectSVGList.forEach(element => {
      this.objectSVGString += element
    });
    this.dataContainer.nativeElement.innerHTML = this.objectSVGString;
  }
  
  private objectSVGString = "";
  private objectSVGList:string[] = [];




  ngOnInit(){}

  ngAfterViewInit() {
    this.objectSVGList.forEach(element => {
      this.objectSVGString += element
    });
    this.dataContainer.nativeElement.innerHTML = this.objectSVGString;
  }

}
