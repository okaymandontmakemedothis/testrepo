import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ToolsListService } from 'src/app/services/tools/tools-list.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private tools:ToolsListService) {}

  onMouseDown($event:MouseEvent){
    this.objectList.pop();
    this.objectList.push(this.tools.toolsList[this.tools.toolSelectedID].onPressed($event));
    this.objectList.push("</svg>");

    this.updateView();
  }

  onMouseUp($event:MouseEvent){
    this.objectList[this.objectList.length-2] = this.tools.toolsList[this.tools.toolSelectedID].onRelease($event);
    this.updateView();
  }

  onMouseMove($event:MouseEvent){
    this.objectList[this.objectList.length-2] = this.tools.toolsList[this.tools.toolSelectedID].onRelease($event);
    this.updateView();
  }

  @ViewChild('dataContainer',{static:false}) dataContainer: ElementRef;
  updateView(){
    this.objectList.forEach(element => {
      this.objectString += element
    });
    this.dataContainer.nativeElement.innerHTML = this.objectString;
  }
  
  private objectString = ""
  private objectList:string[]=["<svg width=\"400\" height=\"100\">",
                       "</svg>"];


  ngOnInit(){}

  ngAfterViewInit() {
    this.objectList.forEach(element => {
      this.objectString += element
    });
    this.dataContainer.nativeElement.innerHTML = this.objectString;
  }

}
