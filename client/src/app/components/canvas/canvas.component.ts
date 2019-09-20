import { Component, OnInit } from '@angular/core';
import { ToolsListService } from 'src/app/services/tools/tools-list.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private tools:ToolsListService) {}

  onMouseDown(){
    this.tools.toolsList[0].onPressed();
  }

  onMouseUp(){
    this.tools.toolsList[0].onRelease();
  }

  onMouseMove(){
    this.tools.toolsList[0].onMove();
  }

  ngOnInit() {
  }

}
